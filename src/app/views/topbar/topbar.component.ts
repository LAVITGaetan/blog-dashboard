import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  constructor(private session: StorageService, private router: Router, private auth: AuthenticationService) { }

  logOut() {
    this.auth.signOut().then(() => {
      this.session.deleteStorageItem('user')
      this.router.navigate(['connexion'])
      alert('Déconnexion')
    }).catch(err => {
      alert('Une erreur est survenue')
    })
  }
}
