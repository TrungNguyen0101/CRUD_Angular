import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CallAPIService } from '../Service/call-api.service';
import { SessionService } from '../Service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  public formData = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private callAPI: CallAPIService,
    private router: Router,
    private session: SessionService
  ) {}

  public handlerLoginAPI() {
    let bodyData = {
      username: this.formData.get('username')?.value,
      password: this.formData.get('password')?.value,
    };
    let urlAPI = 'https://crudbe.herokuapp.com/api/auth/loginAccount';
    this.callAPI
      .APIPost(urlAPI, bodyData, this.session.getSession('token'))
      .subscribe(
        (data: any) => {
          console.log(
            '🚀 ~ file: login.component.ts:41 ~ LoginComponent ~ handlerLoginAPI ~ data',
            data
          );
          if (data.token) {
            this.Toast.fire({
              icon: 'success',
              title: data?.message,
            });
            sessionStorage.setItem('token', data.token);
            this.router.navigate(['/']);
          } else {
            this.Toast.fire({
              icon: 'error',
              title: data?.message,
            });
          }
        },
        (error) => {
          this.Toast.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại ,' + error.error[0].msg,
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      );
  }
}
