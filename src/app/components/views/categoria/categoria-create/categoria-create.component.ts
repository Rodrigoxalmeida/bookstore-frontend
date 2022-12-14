import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../model/categoria.model';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void{
    this.service.create(this.categoria).subscribe((resposta) => {
      this.router.navigate(['categorias']);
      this.service.mensagemSucesso('Estante criada com sucesso! ');
    },err => {
      for(let i =0; i < err.error.errors.length; i++){
        this.service.mensagemErro(err.error.errors[i].message);
      }
    })
  }

  cancelar(): void {
    this.router.navigate(['categorias']);
  }

}
