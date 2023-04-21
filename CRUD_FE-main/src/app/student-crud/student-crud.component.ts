import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { async } from '@angular/core/testing';
import { enableProdMode } from '@angular/core';
import { CallAPIService } from '../Service/call-api.service';
import Swal from 'sweetalert2';
import { SessionService } from '../Service/session.service';
import { Router } from '@angular/router';
enableProdMode();
@Component({
  selector: 'app-student-crud',
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.scss'],
})
export class StudentCrudComponent {
  public token: any;
  public name: string = '';
  public address: string = '';
  public phone: string = '';
  public results: any[] = [];
  public resultsRestore: any[] = [];
  public userId: string = '';
  public resultAlert: any;
  public testInput: any = {
    title: 'Truyền dữ liệu component',
    name: 'Cha sang con',
  };
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
  constructor(
    private http: HttpClient,
    private callAPI: CallAPIService,
    private session: SessionService,
    private router: Router
  ) {}
  public clgData() {
    console.log(this.results);
  }
  public handlerCreateAPI() {
    try {
      let bodyData = {
        name: this.name,
        address: this.address,
        phone: this.phone,
      };
      let urlAPI = 'https://crudbe.herokuapp.com/api/user/createUser';
      this.callAPI
        .APIPost(urlAPI, bodyData, this.session.getSession('token'))
        .subscribe(
          (data) => {
            this.Toast.fire({
              icon: 'success',
              title: 'Thêm thành công!!!',
            });
            setTimeout(() => {
              location.reload();
            }, 2000);
          },
          (error) => {
            this.Toast.fire({
              icon: 'error',
              title:
                'Thêm thất bại ,' +
                (error.error[0].msg !== undefined
                  ? error.error[0].msg
                  : error.error),
            });
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
        );
    } catch (error) {
      console.log(
        '🚀 ~ file: student-crud.component.ts:81 ~ StudentCrudComponent ~ handlerCreateAPI ~ error',
        error
      );
    }
  }
  public handlerUpdateAPI() {
    let bodyData = {
      name: this.name,
      address: this.address,
      phone: this.phone,
    };
    let urlAPI =
      'https://crudbe.herokuapp.com/api/user/updateUser/' + this.userId;
    this.callAPI
      .APIUpdate(urlAPI, bodyData, this.session.getSession('token'))
      .subscribe(
        (data) => {
          this.Toast.fire({
            icon: 'success',
            title: 'Cập nhập thành công!!!',
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        },
        (error) => {
          this.Toast.fire({
            icon: 'error',
            title: 'Cập nhập thất bại ,' + error.error[0].msg,
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      );
  }
  public handlerDeleteAPI(id: any) {
    let bodyData = {
      checkDelete: true,
    };
    let urlAPI = 'https://crudbe.herokuapp.com/api/user/deleteUser/' + id;
    this.callAPI
      .APIUpdate(urlAPI, bodyData, this.session.getSession('token'))
      .subscribe(
        (data) => {
          this.Toast.fire({
            icon: 'success',
            title: 'Xóa thành công!!!',
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        },
        (error) => {
          this.Toast.fire({
            icon: 'error',
            title: 'Xóa thất bại ',
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      );
  }
  public handlerDetail(id: any) {
    this.router.navigate(['/detail', id]);
  }
  public handlerRestoreAPI(id: any) {
    let bodyData = {
      checkDelete: false,
    };
    let urlAPI = 'https://crudbe.herokuapp.com/api/user/restoreUser/' + id;
    this.callAPI
      .APIUpdate(urlAPI, bodyData, this.session.getSession('token'))
      .subscribe(
        (data) => {
          this.Toast.fire({
            icon: 'success',
            title: 'Khôi phục thành công!!!',
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        },
        (error) => {
          this.Toast.fire({
            icon: 'error',
            title: 'Khôi phục thất bại ,' + error.error,
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      );
  }
  public handlerUpdate(data: any) {
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;
    this.userId = data._id;
  }
  public save(): void {
    if (this.userId) {
      this.handlerUpdateAPI();
    } else {
      this.handlerCreateAPI();
    }
  }
  public handlerLogout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.Toast.fire({
      icon: 'success',
      title: 'Đăng xuất thành công',
    });
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
  public ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    if (this.token === null) {
      this.router.navigate(['/login']);
    }
    console.log(this.session.getSession('token'));
    let urlAPIGetAll = 'https://crudbe.herokuapp.com/api/user/findAllUser';
    let urlAPIGetAllRestore =
      'https://crudbe.herokuapp.com/api/user/findAllUserRestore';
    this.callAPI
      .APIGet(urlAPIGetAll, this.session.getSession('token'))
      .subscribe(
        (data: any) => (this.results = data.result),
        (error) => {
          this.Toast.fire({
            icon: 'error',
            title: error.error,
          });
          console.log('123123');
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      );
    this.callAPI
      .APIGet(urlAPIGetAllRestore, this.session.getSession('token'))
      .subscribe(
        (data: any) => (this.resultsRestore = data.result),
        (error) => {
          this.Toast.fire({
            icon: 'error',
            title: error.error,
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      );
  }
}
