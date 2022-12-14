import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../model/livro.model';
import { LivroService } from '../service/livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  
  id_cat: String = '';

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    preco_capa: 0,
    texto: ''
  }

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private service: LivroService

  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.livro.id!).subscribe(() =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagemSucesso('Livro excluído com sucesso!');
    },err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagemErro('Falha ao excluir livro!');
    });
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}

