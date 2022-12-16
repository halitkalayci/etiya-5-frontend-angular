import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    // girilen bilgiler ile backend isteği atılacak..
    if (!this.loginForm.valid) {
      //! TODO: Add toastr warning
      return;
    }
    // HTTP ISTEĞİ
  }
}
