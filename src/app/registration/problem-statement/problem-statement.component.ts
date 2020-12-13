import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problem-statement',
  templateUrl: './problem-statement.component.html',
  styleUrls: ['./problem-statement.component.scss']
})
export class ProblemStatementComponent implements OnInit {
  problemStatementForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  serviceLines: string[] = ['ADM', 'AINA', 'CIS', 'DNA', 'DX', 'EAIS', 'IVS', 'ORC', 'SAP', 'Others'];

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.problemStatementForm = this.formBuilder.group({
      serviceLine: ['', Validators.required],
      theme: ['', Validators.required],
      problemDescription: ['', Validators.required],
      businessBenefits: ['', Validators.required]
    });
  }

  get f() { return this.problemStatementForm.controls; }

  // Need to set the dropdwon selection manually as ...
  //Reactive Forms don't support it in IE & Firefox:
  setServiceLine(e: any) {
    this.problemStatementForm.controls.serviceLine.setValue(e.target.value, {
      onlySelf: true
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.problemStatementForm.invalid) {
      return;
    } else {
      this.router.navigateByUrl('/welcomepage');
    }
  }
}

