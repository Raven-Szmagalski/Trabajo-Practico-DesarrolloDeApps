import { Component, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnDestroy {
  private backButtonSubscription: Subscription | undefined;
  public notes: any[] = [];
  public newNoteTitle: string = '';
  public newNoteDescription: string = '';
  public editingIndex: number | null = null; 

  constructor(
    private platform: Platform,
    private router: Router,
    private authService: AuthService, 
  ) {
    this.notes = [
      {
        title: 'Proyecto',
        description: 'Video Juego "Fosforito2"',
        date: new Date('2024-09-11 06:11'),
      },
      {
        title: 'Comprar',
        description: 'Papa, cebolla...',
        date: new Date('2024-09-10 03:44'),
      },
      {
        title: 'Limpiar',
        description: 'Limpiar la oficina',
        date: new Date('2024-09-09'),
      },
      {
        title: 'Veterinario',
        description: 'Cita para las gatas, Jueves 18pm',
        date: new Date('2024-09-09'),
      },
    ];
  }


  ionViewDidEnter() {
    this.backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(10, () => {
        if (this.router.url === '/home') {
          (navigator as any).app.exitApp();
        }
      });
  }

  ionViewWillLeave() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }



  addNote() {
    if (this.newNoteTitle.trim() && this.newNoteDescription.trim()) {
      const newNote = {
        title: this.newNoteTitle,
        description: this.newNoteDescription,
        date: new Date(),
      };
      this.notes.push(newNote);
  
      this.notes.sort((a, b) => b.date.getTime() - a.date.getTime());
  
      this.newNoteTitle = '';
      this.newNoteDescription = '';
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
  }

  editNote(index: number) {
    this.editingIndex = index;
  }

  saveNote(index: number) {
    this.editingIndex = null;
  }

  cancelEdit() {
    this.editingIndex = null;
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
