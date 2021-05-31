import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //verificar se o jogo ainda esta em andamento
  public jogoEmAndamento: boolean = true;


  public tipoEncerramento!: string; 

  public encerrarJogo(tipo: string): void{
    
    this.tipoEncerramento = tipo;
    
    this.jogoEmAndamento = false;
  }

  public reiniciarJogo(): void{
    this.jogoEmAndamento = true;
    this.tipoEncerramento = "";
  }
}

