import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopbarComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  constructor(private db: FirebaseService) { }
  blogs: any[] = []
  isLoading: boolean = true
  ngOnInit() {
    this.db.getDocuments('blogs').subscribe((data) => {
      data.forEach((doc) => {
        let item = {
          id: doc.payload.doc.id,
          data : doc.payload.doc.data()
        }
        this.blogs.push(item)
      })
      this.isLoading = false
    })
  }
}
