import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-read',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopbarComponent],
  templateUrl: './blog-read.component.html',
  styleUrl: './blog-read.component.css'
})
export class BlogReadComponent {
  constructor(private route: ActivatedRoute, private db: FirebaseService) { }
  blog: any
  isLoading: boolean = true
  ngOnInit() {
    let docId = ''
    this.route.params.subscribe(params => {
      docId = params['id']
    })
    this.db.getSingleDocument('blogs', docId).subscribe((doc) => {
      this.blog = doc.payload.data()
      this.isLoading = false
    })
  }
}
