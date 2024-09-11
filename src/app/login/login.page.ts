import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos correctamente.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.authenticate(email, password).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          title: 'Error de autenticación',
          text: 'El correo electrónico o la contraseña son incorrectos.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}
