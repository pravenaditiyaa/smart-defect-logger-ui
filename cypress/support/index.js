// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import ReproduceSteps from './reproSteps';

Cypress.on("uncaught:exception", (err, runnable) => {
  console.debug(">> uncaught:exception disabled in cypress/support/index.js");
  return false;  // prevents Cypress from failing the test
});

let isSoftAssertion = false;
let errors = [];
let AllErrors = [];


chai.softExpect = function ( ...args ) {
    isSoftAssertion = true;
    return chai.expect(...args);
},
chai.softAssert = function ( ...args ) {
    isSoftAssertion = true;
    return chai.assert(...args);
}

const origAssert = chai.Assertion.prototype.assert;
chai.Assertion.prototype.assert = function (...args) {
    if ( isSoftAssertion ) {
        try {
            origAssert.call(this, ...args)
        } catch ( error ) {
            errors.push(error);
            //fails to assertions block
            throw new Error(msg);
        }
        isSoftAssertion = false;
    } else {

        origAssert.call(this, ...args)
    }
};

// monkey-patch `Cypress.log` so that the last `cy.then()` isn't logged to command log
const origLog = Cypress.log;
Cypress.log = function ( data , fullLog = false ) {
    if (!fullLog  && data && data.error && /soft assertions/i.test(data.error.message) ) {
        data.error.message = '\n\n\t' + data.error.message + '\n\n';
        throw data.error;
    } 
    
    if(fullLog){
        console.log(data);
    }

    return origLog.call(Cypress, ...arguments);
};

// monkey-patch `it` callback so we insert `cy.then()` as a last command 
// to each test case where we'll assert if there are any soft assertion errors
function itCallback ( func ) {
    func();
    cy.then(() => {
        if ( errors.length ) {
            const _ = Cypress._;
            let msg = '';

            if ( Cypress.browser.isHeaded ) {

                msg = 'Failed soft assertions... check log above ↑';
                
            } else {

                _.each( errors, error => {
                    msg += '\n' + error;
                });

                msg = msg.replace(/^/gm, '\t');
            }

            throw new Error(msg);
        }
    });
}

const origIt = window.it;
// window.it = (title, func) => {
//     origIt(title, func && (() => itCallback(func)));
// };
window.it.only = (title, func) => {
    origIt.only(title, func && (() => itCallback(func)));
};
window.it.skip = (title, func) => {
    origIt.skip(title, func);
};

beforeEach(() => {
    //errors = [];
});
afterEach(() => {
   // errors = [];
    isSoftAssertion = false;
    if(errors.length > 0)
    generateDefectReproSteps(errors , cy)
    .then(data=>{
        cy.request("POST", "http://localhost:8989/createBug", {title:"Bug from Cypress", description: data.description ? data.description : ""});    
    })   
    
});

// runs once after all tests in the block
// dev ops ,repor step here
after(() => {
    
  })

  const generateDefectReproSteps = async (_errors, cypress) => {
    let defectLog = {}
    Object.keys(_errors).forEach((key)=> {
        if(typeof _errors[key] === 'object'){
            const reproSteps = [];
            const defect = _errors[key];
            const step = JSON.parse(defect.message.split(': e')[0]);
            
            reproSteps.push('1) As an user navigate To ' +'http://localhost:4200/employeedetails');
            //static fields // text fields
            if(step.type === 'staticText'){
                reproSteps.push('2) Expecting text '+ defect.expected);
                reproSteps.push('3) Actual Text ' + defect.actual);
                defectLog = {description: reproSteps.join("\n")}
            } else if(step.type === 'form'){
                const testcases = step.condtion.toTest;
                Object.keys(testcases).forEach((v ,i)=>{
                    switch (testcases[v].type){
                        case 'input':
                        reproSteps.push(`${i+2} Enter ${testcases[v].name} as ${testcases[v].input}`);
                        break;
                        case 'button':
                        reproSteps.push(`${i+2} Click ${testcases[v].name}`);
                        break;
                    }
                    
                });

                reproSteps.push("Expected path: http://localhost:4200/"+step.condtion.onSubmit.path);

                defectLog = {description: reproSteps.join(",  ")}
                 cypress.url().then(url => {

                    reproSteps.push('Recevied path' +  url)
                    defectLog = {description: reproSteps.join(",  ")}
                })
                
            }
        }
    })
 return defectLog;
}
