import { Component, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnDestroy {
  private backButtonSubscription: Subscription | undefined;

  constructor(private platform: Platform, private router: Router) {}

  ionViewDidEnter() {
    // Escuchar el evento del botón físico de "Atrás"
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      // Si el usuario está en la pantalla de Home, bloquear el botón de "Atrás"
      if (this.router.url === '/home') {
        (navigator as any).app.exitApp(); // Usar Type Assertion para evitar el error de TypeScript
      }
    });
  }

  ionViewWillLeave() {
    // Cancelar la suscripción para evitar fugas de memoria
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    // Cancelar la suscripción al destruir el componente
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }
}
