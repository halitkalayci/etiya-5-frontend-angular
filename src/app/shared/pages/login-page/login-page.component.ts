import { LocalStorageService } from './../../../core/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
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
    this.authService.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
      // Gelen acces token'i kaydet.
      this.localStorageService.add('token', response.access_token);
      // Giriş yapıldığında default olarak nereye yönlendirmek istiyorsak oraya yönlendirelim..
      this.router.navigateByUrl('/dashboard/products');
    });
  }
}
