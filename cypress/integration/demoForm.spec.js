/// <reference types="cypress" />

context('demoForm', () => {
        const testTempalte = [
            {
            testdescription: 'should check static elements',
            type:'staticText',
            wrapper:'.wrapper',
            toTest:[
            {
                selector: 'h3',
                output:'Demo Form',
                message:'main element not found'
            },  
        ]
    },
    {
        testdescription: 'should check static elements 1',
        type:'staticText',
        wrapper:'.wrapper',
        toTest:[
        {
            selector: 'h4',
            output:'Saple sub titile',
            message:'main element not found'
        },  
    ]
},
    {
        testdescription: 'should check first form',
        type:'form',
        onSubmit :{action: 'url', path:'dashboard' , selector:'.loginBtn' ,type:'success'},
        OnCancel:{},
        OnReset:{},
        errorWrapperSelector:'.errorWrapper',
        wrapper:'.formWrapper',
        toTest:[
        {
            selector: 'input[name="username"]',
            message:'sub element not found',
            input:'pooja'
        },
        {
            selector: 'input[name="password"]',
            message:'sub element not found',
            input:'123456'
        }       
    ]
 },
    {
        testdescription: 'should check first form wrong details',
        type:'form',
        onSubmit :{action: 'url', path:'page1' , selector:'.loginBtn' ,type:'failure'},
        OnCancel:{},
        OnReset:{},
        wrapper:'.formWrapper',
        errorWrapperSelector:'.errorWrapper',
        toTest:[
        {
            selector: 'input[name="username"]',
            message:'sub element not found',
            input:'pooj'
        },
        {
            selector: 'input[name="password"]',
            message:'sub element not found',
            input:'123456'
        }       
    ]
    }
]

        beforeEach(() => {
          cy.visit('http://localhost:4200/page1')
        });
    
   // this is rough idea 
        testTempalte.forEach(testcase =>{
            switch(testcase.type){
                case 'staticText':
                        it(testcase.testdescription,  () => {
                            const { softExpect } = chai;
                            cy.get(testcase.wrapper).within(($el) => {  //wrapper element
                                testcase.toTest.forEach( condtion =>{  //loops though condtions
                                    cy.get(condtion.selector).each($elem =>{
                                        condtion.type = testcase.type;
                                        softExpect($elem[0].textContent , JSON.stringify({type:testcase.type ,condtion}) , condtion.testdescription).to.eq(condtion.output);
                                       // cy.screenshot()
                                    })  ; 
                            });
                        });
                    })
                break;

                case 'form':
                    it(testcase.testdescription,  () => {
                        const { softExpect } = chai;
                        cy.get(testcase.wrapper).within(($el) => {  //wrapper element
                            testcase.toTest.forEach( (condtion, index )=>{  //loops though condtions
                                cy.get(condtion.selector).type(condtion.input)
                            });

                            //submit form
                            if(testcase.onSubmit['action']){
                                cy.get(testcase.onSubmit.selector).click();
                                cy.url().then(url => {
                   
                                    softExpect(url.indexOf(testcase.onSubmit.path) !== -1  ,JSON.stringify({type:testcase.type,condtion:testcase}) , null).to.be.true;
                                });
                               
                            }
                            
                        });
                    });
                    
                break;
            }

    })
});
