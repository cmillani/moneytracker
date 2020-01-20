const puppeteer = require('puppeteer');
const read = require('read');

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
        read({prompt: "CPF:"}, (_, result) => {
            res(result);
        })
    })
}

async function retrieveSecurePassword() {
    return await new Promise( res => {
        read({prompt: "Senha:", silent: true}, (_, result) => {
            res(result);
        })
    })
}

async function retrieveCurrentInvestmentsForCredentials(credentials) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://cei.b3.com.br/CEI_Responsivo/');
    await page.type('#ctl00_ContentPlaceHolder1_txtLogin', credentials.document);
    await page.type('#ctl00_ContentPlaceHolder1_txtSenha', credentials.password);
    await page.click('#ctl00_ContentPlaceHolder1_btnLogar');
}

async function processInvestmentsIntoJson(htmlInvestments) {
    console.log(htmlInvestments);
}

retrieveCredentials().then( credentials => {
    retrieveCurrentInvestmentsForCredentials(credentials);
}).then( htmlInvestments => {
    processInvestmentsIntoJson(htmlInvestments);
})