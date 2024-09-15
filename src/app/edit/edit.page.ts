import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  profileData = {
    fullName: 'Bruno diaz',
    email: 'uner@gmail.com',
  };

  currentPassword = '';
  newPassword = '';
  defaultPassword = 'password123';

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async onSave() {
    if (this.currentPassword !== this.defaultPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'La contraseña actual es incorrecta.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (this.newPassword) {
      this.defaultPassword = this.newPassword;
    }

    console.log('Perfil guardado:', this.profileData);

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Los cambios han sido guardados.',
      buttons: ['OK'],
    });
    await alert.present();

    this.navCtrl.navigateBack('/home');
  }

  onCancel() {
    this.navCtrl.back();
  }
}
