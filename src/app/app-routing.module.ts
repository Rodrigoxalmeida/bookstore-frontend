import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './components/template/contatos/contatos.component';
import { CategoriaCreateComponent } from './components/views/categoria/categoria-create/categoria-create.component';
import { CategoriaReadComponent } from './components/views/categoria/categoria-read/categoria-read.component';
import { HomeComponent } from './components/views/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'categorias',
    component: CategoriaReadComponent
  },
  {
    path: 'contatos',
    component: ContatosComponent
},
{
  path: 'categorias/create',
  component: CategoriaCreateComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
