export default  class ReproduceSteps {
    defectList = [];
    _errors = [];
    cypress;
    constructor(errorList , Cypress){
        if(errorList && Cypress){
            this._errors = errorList;
            this.cypress = Cypress;
            this.generateDefectReproSteps();
        }
    }
    async generateDefectReproSteps() {

        Object.keys(this._errors).forEach((key)=> {
            if(typeof this._errors[key] === 'object'){
                const reproSteps = [];
                const defect = this._errors[key];
                const step = JSON.parse(defect.message.split(': e')[0]);
                
                reproSteps.push('1) As an user navigate To ' +'http://localhost:4200/employeedetails');
                //static fields // text fields
                if(step.type === 'staticText'){
                    reproSteps.push('2) Expecting text '+ defect.expected);
                    reproSteps.push('3) Actual Text ' + defect.actual);
                    const defectLog = {description: reproSteps.join("\n")}
                    this.defectList.push(defectLog);
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


                    this.cypress.url().then(url => {

                        reproSteps.push('Recevied path' +  url)
                        const defectLog = {description: reproSteps.join(",  ")}
                        this.defectList.push(defectLog);
                    })
                    
                   
                }
              
                
            }
        })

      
     
    }
}