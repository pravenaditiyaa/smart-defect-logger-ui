/// <reference types="cypress" />

context('registrationForm', () => {
        const testTempalte = [
            {
            testdescription: 'validating navbar static text',
            type:'staticText',
            wrapper:'.navWrapper',
            toTest:[
            {
                id: '#navEventDetails',
                output:'Event Details',
                message:'Event Details route element not found'
            },  
            {
                id: '#navTeams',
                output:'Teams',
                message:'Teams route element not found'
            },
            {
                id: '#navRegister',
                output:'Register',
                message:'Register route element not found'
            },
            {
                id: '#navLogin',
                output:'Login',
                message:'Login route element not found'
            }
        ]
    },
    
    {
        testdescription: 'validating registartion-employee details form',
        type:'form',
        onSubmit :{action: 'url', path:'problemstatement' , selector:'#btnNext' ,type:'success'},
        OnCancel:{},
        OnReset:{},
        errorWrapperSelector:'.errorWrapper',
        wrapper:'.empWrapper',
        toTest:[
            {   
            id:'#name',
            type:'input',
            input:'Pooja'
        },
        {
            id:'#teamName',
            type:'input',
            input:'iTECH'
        } ,  
        {
            id:'#teamLoginId',
            type:'input',
            input:'645928'
        },
        {
            id:'#password',
            type:'input',
            input :'password'
        },
        {
            id:"#btnNext",
            type:'button'
        }
        
        
    ]
 }
]

        beforeEach(() => {
          cy.visit('http://localhost:4200')
        });
    
   // this is rough idea 
   
        testTempalte.forEach(testcase =>{
            switch(testcase.type){
                case 'staticText':
                        it(testcase.testdescription,  () => {
                            const { softExpect } = chai;
                            var i=0;
                            cy.get(testcase.wrapper).within(($el) => {  //wrapper element
                                testcase.toTest.forEach( condtion =>{  //loops though condtions
                                   cy.get(condtion.id).each($elem =>{
                                        condtion.type = testcase.type;
                                        cy.get(condtion.id).invoke('text').should(someValue => {
                                        if(someValue!==condtion.output){
                                        softExpect($elem[0].textContent , JSON.stringify({type:testcase.type ,condtion, screenshot:condtion.message+i+'.png'}) , condtion.testdescription, 'scrrenshot').to.eq(condtion.output);
                                       cy.screenshot(condtion.message+i+'.png');
                                        }
                                    });
                                    
                                    })  ; 
                            });
                        });  
                    })
                break;

                case 'form':
                    it(testcase.testdescription,  () => {
                        const { softExpect } = chai;
                        cy.get("#navRegister").click();
                        cy.get(testcase.wrapper).within(($el) => {  //wrapper element
                            testcase.toTest.forEach( (condtion, index )=>{  //loops though condtions
                                switch (condtion.type){
                                case 'input':
                                cy.get(condtion.id).type(condtion.input)
                                break;
                                case 'checkbox':
                                cy.get(condtion.id).check() 
                                break;
                                case 'radio':
                                cy.get(condtion.id).check(condtion.value) 
                                break;
                                case 'dropdown':  
                                cy.get(condtion.id).select(condtion.input)  
                                break;
                                case 'button':
                                if(testcase.onSubmit['action']){
                                    cy.get(testcase.onSubmit.selector).click();
                                    cy.url().then(url => {
                                        softExpect(url.indexOf(testcase.onSubmit.path) !== -1  ,JSON.stringify({type:testcase.type,condtion:testcase}) , null).to.be.true;
                                    });
                                   
                                }
                                break;
                                }
                            });

                        
                            //submit form
                           
                            
                        });
                    });
                    
                break;
            }

    })
});
