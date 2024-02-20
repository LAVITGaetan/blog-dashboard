import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { BlogListComponent } from './views/blog-list/blog-list.component';
import { LoginComponent } from './views/login/login.component';
import { BlogEditorComponent } from './views/blog-editor/blog-editor.component';
import { BlogReadComponent } from './views/blog-read/blog-read.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: RegisterComponent },
  { path: 'blogs', component: BlogListComponent, canActivate: [AuthGuard] },
  { path: 'blogs/:id', component: BlogReadComponent, canActivate: [AuthGuard] },
  { path: 'create-blog', component: BlogEditorComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
