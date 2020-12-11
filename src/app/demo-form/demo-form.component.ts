import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent implements OnInit {
  username;
  password;
  error = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(){
  
    if(this.username === 'pooja'){
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
     // this.error = true;
    }
  }

}
