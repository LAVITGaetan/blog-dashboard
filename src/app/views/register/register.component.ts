import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(private router: Router, private auth: AuthenticationService) { }
  isLoading: boolean = false
  registerForm = new FormGroup({
    username: new FormControl('user_', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('admin@email.re', [Validators.required, Validators.email]),
    password: new FormControl('Somepassword', Validators.required),
  })

  register() {
    this.isLoading = true
    let email = this.registerForm.get('email')?.value
    let password = this.registerForm.get('password')?.value
    if (email && password)
      this.auth.signIn(email, password).then(userCredentials => {
        this.router.navigate(['/blogs'])
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        alert('Une erreur est survenue, essayez une autre adresse email')
      })
  }
}
