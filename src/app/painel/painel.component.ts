import { Component, OnInit, EventEmitter , Output} from '@angular/core';
//importando as frases
import {Frase} from '../shared/frase.model';
//importando arquivo mock para pegar os objetos
import {FRASES} from './frases-mock';



@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {


  //atributo que sera responsavel por pegar as instancias do mock e colocar
  //em um array
  public frases: Frase[] = FRASES;

  //gerando o titulo da pagina
  public instrucao: string = "Traduza a Frase:"

  //atributo responsavel por guardar a resposta digitada pelo usuario
  public resposta: string = "";


  //variavel que verifica a rodada atual
  public rodada: number = 0;

  //variavel q guarda a frase da rodada atual
  public rodadaFrase: Frase = new Frase('','');

  //responsavel por guardar o status do progresso
  public progresso: number = 0;

  //responsavel por guardar a quantidade de tentativas
  public tentativas: number = 3;

  //guardando o eventMitter na variavel, utilizando o decorador output para enviarmos a informacao a app.component.ts
  //criando um atributo publico do component painel, associa a uma instancia da classe eventmitter
  //e ao termino decore o atributo e expoe em um component PAI
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  //eventBinding - tecnica de data biding - comunicacao entre template html e sua receptiva classe
  //é um metodo one way binding
  constructor() {
    //pegando a frase referente a rodada atual e inserindo dentro de rodadaFrase
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  //funcao responsavel por atualizar a resposta
  //sera do tipo void e responsavel por
  //recebera um parametro de resposta vindo do textarea como se estivesse fazendo um this.value do item
  public atualizaResposta(resposta:Event): void{
    //definindo que o tipo de objeto q esta sendo referenciado e html para podermos acessar a propriedade value
    //recuperar valor digitado dentro do text area e colocando dentro da propriedade resposta
    this.resposta = ((<HTMLInputElement>resposta.target).value);
    //console.log(this.resposta);
  }


  //funcao responsavel por verificar a resposta contida na text area acionado pelo click do button
  public verificarResposta(): void{
    
    if(this.rodadaFrase.frasePtBr == this.resposta){
            
      //incremento barra progresso de maneira dinamica, pegando o valor
      //do length de frases e dividindo por 100
      this.progresso = this.progresso + (100 / this.frases.length);


      //trocar pergunta da rodada
      this.rodada++;

      //verificacao se acertou todas as tentativas, serao usados como target para encerrar o jogo
      if(this.rodada === 4){
       this.encerrarJogo.emit("Vitoria");
      }
      //recebendo a alteracao da rodada++ e colocando dentro do indice da frase e atualiza
      this.atualizaRodada();


    }else{
      this.tentativas --
      if(this.tentativas === 0){
        this.encerrarJogo.emit("derrota");
      }
    }

  }

  public atualizaRodada(): void{
    this.rodadaFrase = this.frases[this.rodada];
    //limpar resposta do usuario 
    this.resposta =  '';
  }
}
 