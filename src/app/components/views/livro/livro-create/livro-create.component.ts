import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../model/livro.model';
import { LivroService } from '../service/livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  titulo = new FormControl('', [Validators.minLength(3)]);
  autor = new FormControl('', [Validators.minLength(3)]);
  descricao = new FormControl('', [Validators.minLength(10)]);

  id_cat: String = '';

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private service: LivroService

  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  create(): void {
    this.service.create(this.livro,this.id_cat).subscribe((resposta) =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagemSucesso('Livro Cadastrado com sucesso!');
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagemErro('Erro ao cadastrar!');
    })
  }


  getMessage(){
    if(this.titulo.invalid){
      return 'O Campo título deve conter entre 3 e 100 caracteres';
    }
    if(this.autor.invalid){
      return 'O Campo Autor deve conter entre 3 e 100 caracteres';
    }
    if(this.descricao.invalid){
      return 'O Campo Descrição deve conter entre 10 e 2.000.000 caracteres';
    }
    return false;
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}
