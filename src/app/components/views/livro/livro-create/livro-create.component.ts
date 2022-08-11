import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  titulo = new FormControl('', [Validators.minLength(3)]);
  autor = new FormControl('', [Validators.minLength(3)]);
  descricao = new FormControl('', [Validators.minLength(10)]);

  constructor() { }

  ngOnInit(): void {
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

}
