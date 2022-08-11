import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../service/livro.service';
import { Livro } from './model/livro.model';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  ELEMENT_DATA: Livro[] = []

  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];
  dataSource = new MatTableDataSource<Livro>(this.ELEMENT_DATA);

  id_cat: String = '';


  constructor(

    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  findAll() {
    this.service.findAllByCategoria(this.id_cat).subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Livro>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navegarParaCadastrarNovoLivro(): void{
    this.router.navigate([`categorias/${this.id_cat}/livros/create`]);
  }

  navegarParaEstantes(): void{
    this.router.navigate([`categorias`]);
  }

}
