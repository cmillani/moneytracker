const puppeteer = require('puppeteer');
const read = require('read');
const fs = require('fs');

class Parameters {
    username = null
    password = null
    output = null

    isValid() {
        return !!this.username || !!this.password || !!this.output;
    }
}

var programParameters = new Parameters()

class Credentials {
    constructor(document, password) {
        this.document = document;
        this.password = password;
    }
}

async function retrieveCredentials() {
    let document = await retrieveDocument();
    let password = await retrieveSecurePassword();

    return new Credentials(document, password);
}

async function retrieveDocument() {
    return await new Promise( res => {
        if (programParameters.username != null) {
            res(programParameters.username);
        } else {
            read({prompt: "CPF:"}, (_, result) => {
                res(result);
            })
        }
    })
}

async function retrieveSecurePassword() {
    return await new Promise( res => {
        if (programParameters.password != null) {
            res(programParameters.password);
        } else {
            read({prompt: "Senha:", silent: true}, (_, result) => {
                res(result);
            })
        }
    })
}

async function retrieveCurrentInvestmentsForCredentials(browser, credentials) {
    const page = await browser.newPage();
    await page.goto('https://cei.b3.com.br/CEI_Responsivo/');
    await page.type('#ctl00_ContentPlaceHolder1_txtLogin', credentials.document);
    await page.type('#ctl00_ContentPlaceHolder1_txtSenha', credentials.password);
    let waitLogin = page.waitForNavigation();
    await page.click('#ctl00_ContentPlaceHolder1_btnLogar');
    await waitLogin;
    await page.goto('https://cei.b3.com.br/CEI_Responsivo/negociacao-de-ativos.aspx');
    let optionsSelectElement = await page.waitForSelector("#ctl00_ContentPlaceHolder1_ddlAgentes");

    let allOptions = await listAllOptionsFromSelect(optionsSelectElement);

    let investmentsList = [];
    for(let option of allOptions) {
        await page.select('#ctl00_ContentPlaceHolder1_ddlAgentes', option);
        await page.click('#ctl00_ContentPlaceHolder1_btnConsultar');
        let table = await page.waitForSelector('#ctl00_ContentPlaceHolder1_rptAgenteBolsa_ctl00_rptContaBolsa_ctl00_pnAtivosNegociados');
        let headerRow = await table.$('thead > tr');
        let rows = await table.$$('tbody > tr');
        investmentsList.push(...(await parseTableToJSON(headerRow, rows)));
        await page.goto('https://cei.b3.com.br/CEI_Responsivo/negociacao-de-ativos.aspx');
    }

    return investmentsList;
}

async function parseTableToJSON(titleRow, rows) {
    let titles = await titleRow.$$('th');
    let elements = [];
    for(row of rows) {
        let newElement = {};
        let columns = await row.$$('td');
        for(i in titles) {
            let title = sanitizeText(await (await titles[i].getProperty('innerHTML')).jsonValue());
            let value = sanitizeText(await (await columns[i].getProperty('innerHTML')).jsonValue());
            newElement[title] = value;
        }
        elements.push(newElement);
    }

    return elements;
}

async function listAllOptionsFromSelect(select) {
    let options = Array.apply(null, await select.$$('option'));
    let allOptions = [];
    for(option of options) {
        allOptions.push(await (await option.getProperty('value')).jsonValue());
    }

    return allOptions.slice(1);
}

function validateInputs() {
    let currentIndex = 0
    while(!!process.argv[currentIndex]) {
        switch(process.argv[currentIndex]) {
            case "-u":
                programParameters.username = process.argv[++currentIndex];
                break;
            case "-p":
                programParameters.password = process.argv[++currentIndex];
                break;
            case "-o":
                programParameters.output = process.argv[++currentIndex];
                break;
            default:
                break;
        }
        currentIndex++;
    }

    return Promise.resolve();
}

function sanitizeText(text) {
    let clearedSpaces = text.replace(/\s/g, '');
    let clearedTags = clearedSpaces.replace(/<\s*[^>]*>/g, '');
    return clearedTags.replace('\\n', '');
}


validateInputs().then( () => {
    puppeteer.launch({headless: true}).then ( browser => {
        retrieveCredentials().then( credentials => {
            return retrieveCurrentInvestmentsForCredentials(browser, credentials);
        }).then( investments => {
            let dataToOutput = JSON.stringify(investments);
            if (programParameters.output != null) {
                fs.writeFileSync(programParameters.output, dataToOutput);
            } else {
                console.log(dataToOutput);   
            }
            return browser.close();
        }).catch ( error => {
            console.error(error);
            return browser.close().then( () => {
                process.exit(-1);
            });
        });
    });
}).catch( () => {
    process.exit(-1);
})

