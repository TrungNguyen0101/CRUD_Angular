import { CallAPIService } from './../Service/call-api.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SessionService } from '../Service/session.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public formData = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    role: ['admin', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private callAPI: CallAPIService,
    private router: Router,
    private session: SessionService
  ) {}
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
  public handlerCreateAPI() {
    console.log(this.formData.get('username')?.value);
    let bodyData = {
      username: this.formData.get('username')?.value,
      password: this.formData.get('password')?.value,
      confirmPassword: this.formData.get('confirmPassword')?.value,
      role: this.formData.get('role')?.value,
    };
    let urlAPI = 'https://crudbe.herokuapp.com/api/auth/createAccount';
    this.callAPI
      .APIPost(urlAPI, bodyData, this.session.getSession('token'))
      .subscribe(
        (data) => {
          this.Toast.fire({
            icon: 'success',
            title: 'Thêm thành công!!!',
          });
          this.router.navigate(['/login']);
        },
        (error) => {
          this.Toast.fire({
            icon: 'error',
            title: 'Thêm thất bại ,' + error.error[0].msg,
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      );
  }
}
