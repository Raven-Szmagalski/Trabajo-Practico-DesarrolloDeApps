import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  redirectToRegister() {
    this.router.navigate(['/registro']);
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.showErrors();
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.authenticate(email, password).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        this.showAuthError();
      }
    });
  }

  async showErrors() {
    const controls = this.loginForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        const control = controls[name];
        if (control.errors?.['required']) {
          const alert = await this.alertController.create({
            header: 'Campo requerido',
            message: `${this.getFieldLabel(name)} es obligatorio.`,
            buttons: ['Ok']
          });
          await alert.present();
        } else if (control.errors?.['email']) {
          const alert = await this.alertController.create({
            header: 'Error en el campo',
            message: `${this.getFieldLabel(name)} debe ser un correo electrónico válido.`,
            buttons: ['Ok']
          });
          await alert.present();
        }
        break; 
      }
    }
  }

  async showAuthError() {
    const alert = await this.alertController.create({
      header: 'Error de autenticación',
      message: 'El correo electrónico o la contraseña son incorrectos.',
      buttons: ['Ok']
    });
    await alert.present();
  }

  getFieldLabel(name: string): string {
    const labels: { [key: string]: string } = {
      email: 'Email',
      password: 'Contraseña'
    };
    return labels[name] || name;
  }
}
