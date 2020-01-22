const fs = require('fs');

class Parameters {
    inputFile = null;
    outputFile = null;
    canUseStdin = !process.stdin.isTTY;

    isValid() {
        if (this.canUseStdin || !!this.inputFile) {
            return;
        } else {
            throw "Invalid Input configuration: Provide a file name or pipe";
        }
    }
}

const OperationType = {
    BUY: 'buy',
    SELL: 'sell'
}

class Operation {
    constructor(type,date,assetCode,assetSpecification,price,quantity) {
        this.type = type;
        this.date = date;
        this.assetCode = assetCode;
        this.assetSpecification = assetSpecification;
        this.price = price;
        this.quantity = quantity;
        this.isManual = false;
    }
}

var programParameters = new Parameters()

function validateInputs() {
    let currentIndex = 0
    while(!!process.argv[currentIndex]) {
        switch(process.argv[currentIndex]) {
            case "-i":
                programParameters.inputFile = process.argv[++currentIndex];
                break;
            case "-o":
                programParameters.outputFile = process.argv[++currentIndex];
                break;
            default:
                break;
        }
        currentIndex++;
    }

    return Promise.resolve();
}

function retrieveInput() {
    if (!!programParameters.inputFile) {
        return require(programParameters.inputFile);
    } else if (programParameters.canUseStdin) {
        return new Promise( res => {
            var data = "";
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
            
            process.stdin.on('data', chunk => {
                data += chunk;

            });

            process.stdin.on('end', () => {
                res(JSON.parse(data))
            })
        })
    } else {
        throw "Invalid Input configuration: Provide a file name or pipe";
    }
}

function dateFromString(string) {
    let components = string.split('/');
    return new Date(components[2], components[1] - 1, components[0]);
}

function operationTypeFromString(string) {
    if (string == "C") {
        return OperationType.BUY;
    } else if (string == "V") {
        return OperationType.SELL;
    }
}

function parseInvestments(input) {
    if (Array.isArray(input)) {
        let operations = [];
        for(let operation of input) {
            let date = dateFromString(operation["DatadoNegócio"]);
            let type = operationTypeFromString(operation["Compra/Venda"]);
            let asset = operation["CódigoNegociação"];
            let assetSpecification = operation["EspecificaçãodoAtivo"];
            let quantity = operation["Quantidade"];
            let price = parseFloat(operation["Preço(R$)"].replace(",", "."));
            operations.push(new Operation(type, date, asset, assetSpecification, price, quantity));
        }
        return operations;
    } else {
        throw `Expected array, found ${typeof(input)}`;
    }
}

function handleOutput(data) {
    if (!!programParameters.outputFile) {
        return fs.writeFileSync(programParameters.outputFile, JSON.stringify(data));
    } else {
        console.log(data);
    }
}

validateInputs().then( () => {
    return programParameters.isValid();
}).then( () => {
    return retrieveInput();
}).then( input => {
    return parseInvestments(input)
}).then( data => {
    return handleOutput(data);
}).catch( error => {
    console.error(error);
    process.exit(-1);
})