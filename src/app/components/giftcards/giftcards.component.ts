import { Component, OnInit } from '@angular/core';
import { Giftcard } from '../../models/giftcard';
import { GiftcardService } from '../../services/giftcard.service';
import { Global } from '../../services/global';//para sacar la  url de la api
import {Router,ActivatedRoute, Params} from '@angular/router' //invocamos estas clases
//ya que vamos a tener que recoger los datos (id) que nos llegan para saber cual 
//projecto devolver 


@Component({
  selector: 'app-giftcards',
  templateUrl: './giftcards.component.html',
  styleUrls: ['./giftcards.component.css']
})
export class GiftcardsComponent implements OnInit {

  public url: string;
  public giftcard: Giftcard; 
  public confirm: boolean;

  public giftcards: Giftcard[]=[]; //este array publica es la que tendran los objetos JSON.
  public entendido: boolean;


showModal: boolean = false;
  content: any;
  title: any;



  constructor(
private _giftcardService: GiftcardService,
private _route: ActivatedRoute, 
private _router: Router

    ) {

this.entendido=false;
this.url=Global.url;
this.giftcard=new Giftcard('','',0,'','','','','',0,0,0,'','',0);
this.confirm=false;

     }

  ngOnInit(): void {

     this.getGiftcards();

     /*Cargar giftcard*/

   



  }

  getGiftcards(){
    
    this._giftcardService.getGiftcards().subscribe( //subsicribimos al observable y leemos la respuesta que nos lee por la API.
      response => {//primera funcion de callback
        if(response.giftcards){
          this.giftcards = response.giftcards; //
          console.log(response.giftcards);
          
        }
      },
      error => { //segunda funcion de callback
        console.log(<any>error);
      }
    );
  }

/*Giftcard/id component*/

/*
  this._route.params.subscribe(params =>{ //SUBSCRIBE PARA RECIBIR LOS PARAMETROS
      let id= this._route.snapshot.params.id; //
      this.getGiftcard(id);

    });

*/

  getGiftcard(id:any){
// MANDA PEICIO AJAX AL BACKEND
        this._giftcardService.getGiftcard(id).subscribe(
          response=>{  //Response es el objeto que llega de la API
            this.giftcard=response.giftcard;

        },
        error=>{
          console.log(<any>error);
        })

    }


 deleteGiftcard(id:any){
        this._giftcardService.deleteGiftcard(id).subscribe(
          response=>{
             console.log(response);
            if (response.giftcadrd){
              this._router.navigate(['/giftcards']);
            }

                  },
                  error=> {
                    console.log(<any>error);
                    console.log("Ha ocurrido un error al eliminar la giftcard. Por favor verifique manualmente si se ha borrado de la sección /giftcard");
                  }
        );




}

setConfirm(confirm:any){
      this.confirm=confirm;

      }




}
