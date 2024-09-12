import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  // Datos preestablecidos del perfil
  profileData = {
    fullName: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phoneNumber: '123-456-7890',
  };

  // Contraseñas
  currentPassword = '';
  newPassword = '';
  defaultPassword = 'password123'; // Contraseña preestablecida

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {}


  // Guardar los cambios del perfil
  async onSave() {
    if (this.currentPassword !== this.defaultPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'La contraseña actual es incorrecta.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.newPassword) {
      this.defaultPassword = this.newPassword; // Actualiza la contraseña si se proporciona una nueva
    }

    // Simular guardado de datos
    console.log('Perfil guardado:', this.profileData);
    
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Los cambios han sido guardados.',
      buttons: ['OK']
    });
    await alert.present();

    // Regresa a la vista anterior (perfil)
    this.navCtrl.navigateBack('/home');
  }

  // Cancelar y volver al perfil sin guardar cambios
  onCancel() {
    this.navCtrl.back();
  }
}
