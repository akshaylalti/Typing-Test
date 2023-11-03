import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  sideNavStatus: boolean = true;

  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(private navigationService: NavigationService) {
    this.registerForm = new FormGroup({});
    this.loginForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]),
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]),
    });
  }

  menuButtonClicked() {
    this.sideNavStatus = !this.sideNavStatus;
    this.sideNavToggled.emit(this.sideNavStatus);
  }

  isLoggedIn(): boolean {
    return this.navigationService.isLoggedIn();
  }

  createAccount() {
    const newUser: User = {
      name: this.Name.value,
      email: this.Email.value,
      pwd: this.PWD.value,
      memberSince: new Date().toString(),
    };

    this.navigationService.register(newUser).subscribe((res: any) => {
      alert('Registered SUCCESSFULLY!!');
      newUser.id = parseInt(res);
    });
  }

  loginUser() {
    this.navigationService
      .login(this.LEmail.value, this.LPWD.value)
      .subscribe((res: any) => {
        if (res.error) {
          alert('User Does Not Exisit!!');
        } else {
          this.navigationService.setUser(res);
          location.reload();
        }
      });
  }

  logOutUser() {
    this.navigationService.logOut();
    location.reload();
  }

  get Name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.registerForm.get('pwd') as FormControl;
  }

  get LEmail(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get LPWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}
