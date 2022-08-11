import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Categoria } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = {
    id:'',
    nome: '',
    descricao: ''
  }


  constructor(
    
    private service: CategoriaService,
    private route: ActivatedRoute, 
    private router: Router
    
    ) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findByid();
  }

  findByid(): void{
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria = resposta;
      this.categoria.nome = resposta.nome;
      this.categoria.descricao = resposta.descricao;
    })
  }

  delete(): void{
    this.service.delete(this.categoria.id!).subscribe((resposta) => {
      this.router.navigate(['categorias']);
      this.service.mensagemSucesso('Estante escluída com sucesso !');
    }, err => {
      this.service.mensagemErro(err.error.error);
    });
  }

  cancel(): void{
    this.router.navigate(['categorias']);
  }

}
