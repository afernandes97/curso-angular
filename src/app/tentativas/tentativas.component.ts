import { Component, Input, OnInit, OnChanges } from '@angular/core';



//importando mecanica do coracao
import {Coracao} from '../shared/coracao.model';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {


  //
  @Input() public tentativas!: number 

  public coracoes: Coracao[] = [
    new Coracao(true),
    new Coracao(true),
    new Coracao(true)
  ]

  

  constructor() { 
    
  }

  //executado durante o processo de decoracao dos valores recebidos de valores pais para componentes filhos
  //sempre q existe um input ou alteracao de dados, esse metodo é executado
  ngOnChanges(){
    if(this.tentativas !== this.coracoes.length){
      let indice = this.coracoes.length - this.tentativas;
      this.coracoes[indice-1].cheio = false;
    }
  }

  ngOnInit(): void {
  } 
  

}
