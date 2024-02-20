import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private session: StorageService, private router: Router, private auth: AuthenticationService) { }
  isLoading: boolean = false
  loginForm = new FormGroup({
    email: new FormControl('admin@email.re', [Validators.required, Validators.email]),
    password: new FormControl('Somepassword', Validators.required),
  })

  login() {
    this.isLoading = true
    let email = this.loginForm.get('email')?.value
    let password = this.loginForm.get('password')?.value
    if (email && password)
      this.auth.logIn(email, password).then(userCredentials => {
        this.router.navigate(['blogs'])
        this.isLoading = false

      }).catch(err => {
        this.isLoading = false
        alert('Connexion impossible, vérifiez vos identifiants')
      })
  }
}
