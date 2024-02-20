import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidebarComponent, TopbarComponent],
  templateUrl: './blog-editor.component.html',
  styleUrl: './blog-editor.component.css'
})
export class BlogEditorComponent {
  constructor(private db: FirebaseService, private renderer: Renderer2, private router: Router) { }
  componentListShowed: boolean = false
  idCount: number = 0
  custom_fields: any[] = []
  blogForm = new FormGroup({
    title: new FormControl('Mon nouvel article', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('Ma description', [Validators.required, Validators.minLength(6)]),
  })

  createBlog() {
    let data = {
      title: this.blogForm.get('title')?.value,
      description: this.blogForm.get('description')?.value,
      fields: [] as { type: string, value: string, order: number, href: string }[]
    }
    this.custom_fields.forEach(field => {
      let field_value = (document.getElementById(`field_${field.id}`) as HTMLInputElement).value;
      let link = ''
      if (field.type === 'button') {
        link = (document.getElementById(`href_${field.id}`) as HTMLInputElement).value;
      }
      data.fields.push({
        type: field.type,
        value: field_value,
        order: field.order,
        href: link
      });
    })
    this.db.createDocument('blogs', data).then(() => {
      alert('document crée')
      this.router.navigate(['/blogs'])
    }).catch(e => {
      alert('inpossible de créer le document')
    })
  }

  showComponentlist() {
    this.componentListShowed = !this.componentListShowed
  }

  addElement(type: string) {
    let item = {
      id: this.idCount,
      type: type,
      order: this.custom_fields.length,
    }
    this.custom_fields.push(item)
    this.idCount += 1
    this.createElement(type, item)
    this.showComponentlist()
  }

  createElement(type: string, item: any) {
    let editor = document.getElementById('editor')
    let element_group = document.createElement('div')
    element_group.setAttribute('class', 'editor-group')
    element_group.setAttribute('id', `group_${item.id}`);
    editor?.appendChild(element_group)
    let element_close = document.createElement('div')
    element_close.setAttribute('class', 'group-close')
    element_close.innerHTML = 'x'
    this.renderer.listen(element_close, 'click', () => this.deleteField(item.id));
    element_group.appendChild(element_close)

    switch (type) {
      case 'text':
        let textElement = document.createElement('input');
        textElement.setAttribute('class', 'editor-text');
        textElement.setAttribute('id', `field_${item.id}`);
        textElement.setAttribute('type', 'text')
        textElement.setAttribute('value', 'Nouveau paragraphe')
        textElement.setAttribute('placeholder', 'Nouveau paragraphe')
        element_group?.appendChild(textElement)
        break;
      case 'title':
        let titleElement = document.createElement('input');
        titleElement.setAttribute('class', 'editor-text');
        titleElement.setAttribute('id', `field_${item.id}`);
        titleElement.setAttribute('type', 'text')
        titleElement.setAttribute('value', 'Nouveau titre')
        titleElement.setAttribute('placeholder', 'Nouveau titre')
        element_group?.appendChild(titleElement)
        break;
      case 'button':
        let buttonElement = document.createElement('input');
        buttonElement.setAttribute('class', 'editor-text');
        buttonElement.setAttribute('id', `field_${item.id}`);
        buttonElement.setAttribute('type', 'text')
        buttonElement.setAttribute('value', 'Texte de mon bouton')
        buttonElement.setAttribute('placeholder', 'Texte de mon bouton')
        element_group?.appendChild(buttonElement)
        let hrefElement = document.createElement('input');
        hrefElement.setAttribute('class', 'editor-text');
        hrefElement.setAttribute('id', `href_${item.id}`);
        hrefElement.setAttribute('type', 'text')
        hrefElement.setAttribute('value', 'URL')
        hrefElement.setAttribute('placeholder', 'https://')
        element_group?.appendChild(hrefElement)
        break;
    }
  }

  createInput(group: any) {

  }

  deleteField(id: string) {
    let dom_item = document.getElementById(`group_${id}`)
    let array_item = this.custom_fields.findIndex(el => el.id == id)
    this.custom_fields.forEach(el => {
      if (array_item < el.order)
        el.order -= 1
    })
    this.custom_fields.splice(array_item, 1);
    dom_item?.remove()
  }

}
