import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {HttpClient} from '@angular/common/http';
import {Subscription} from "rxjs";
import * as globals from '../../global';
import {refreshJwt} from "../../global";
import {NzModalService} from "ng-zorro-antd";

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

@Injectable()
export class AuthComponent implements OnInit {
  reqType: String = '';
  mainForm: FormGroup;
  title: String = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient,
              private modal: NzModalService) {
  }

  ngOnInit() {
    refreshJwt()
    this.mainForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.route.url.subscribe(data => {
      this.reqType = data[data.length - 1].path; // get a string that is either 'login', 'logoff' or 'register' from the current URL
      this.title = (this.reqType === 'register') ? 'Sign up' : 'Sign in';
      if (this.reqType === 'register') {
        this.mainForm.addControl('email', new FormControl('',
          [Validators.required, Validators.email]));
        this.mainForm.addControl('confirmPass', new FormControl('',
          [Validators.required, this.matchPassword('password')]
        ));
      }
      else if (this.reqType == 'logoff'){
          localStorage.clear()
          refreshJwt()
          this.router.navigateByUrl("/login")
      }
      else{
        if(globals.username != null)
          this.router.navigateByUrl("/cv")
      }
    });
  }

  matchPassword(comparedName: string): ValidatorFn {
    return (thisPass: AbstractControl): { [key: string]: any } => {
      const comparedPass: AbstractControl = thisPass.root.get(comparedName);
      if (comparedPass) {
        const subscription: Subscription = comparedPass
          .valueChanges.subscribe(() => {
            thisPass.updateValueAndValidity();
            subscription.unsubscribe();
          });
      }
      return (comparedPass && thisPass.value === comparedPass.value) ? null : {notMatch: true};
    };
  }

  login(username: string, password: string) {
    let body = JSON.stringify({ username: username, password: password });

    this.http.post<any>(globals.backend_path + "login", body, {
      observe: 'response',
    }).subscribe(
        (resp) => {
          localStorage.setItem('jwt_token', resp.headers.get("Authorization"));
          let ref = this.modal.success({
              nzTitle: 'Login successful',
              nzContent: 'The page will be automatically refreshed after 2s.',
              nzOnOk: () => {
                this.router.navigateByUrl("/cv")
                refreshJwt()
              }
          })
          setTimeout(() => {
            ref.destroy()
            this.router.navigateByUrl("/cv")
            refreshJwt()
          }, 2000);
        },
        () =>{

          this.modal.error({
            nzTitle: 'Login failed',
            nzContent: 'Wrong username or password!',
            nzOnOk: () => {
              this.mainForm.reset()
            }
          })
        })
  }

  onSubmit(data) {
    if(this.reqType == 'login'){
      this.login(data.username, data.password)
    } else {
      this.http.post<any>(globals.backend_path + "signup", data, {
        observe: 'response',
      }).subscribe(resp => {
        localStorage.setItem('jwt_token', resp.headers.get("Authorization"));
        let ref = this.modal.success({
          nzTitle: 'Register successful',
          nzContent: 'The page will be automatically refreshed after 2s.',
          nzOnOk: () => {
            this.router.navigateByUrl("/cv")
            refreshJwt()
          }
        });
        setTimeout(() => {
          ref.destroy()
          this.router.navigateByUrl("/cv")
          refreshJwt()
          }, 2000
        )},
        () =>{
        this.modal.error({
          nzTitle: 'Register failed',
          nzContent: 'Duplicated username!',
          nzOnOk: () => {
            this.mainForm.reset()
          }
        })
      });
    }
  }
}
