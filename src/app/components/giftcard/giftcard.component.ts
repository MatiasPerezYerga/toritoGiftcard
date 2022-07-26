import { Component, OnInit } from '@angular/core';
import{Giftcard} from '../../models/giftcard';//sali del directorio de create , sali del directorio de compomnentes y entras al de modelos
import{GiftcardService} from '../../services/giftcard.service';
//importo la clase y el servicio
import{Global} from '../../services/global';
import {Router,ActivatedRoute, Params} from '@angular/router' //invocamos estas clases
//ya que vamos a tener que recoger los datos (id) que nos llegan para saber cual 
//projecto devolver 

//importo el servicio Upload
import {UploadService} from'../../services/upload.service';



@Component({
  selector: 'app-giftcard',
  templateUrl: './giftcard.component.html',
  styleUrls: ['./giftcard.component.css']
})
export class GiftcardComponent implements OnInit {



  public url: string;
  public giftcard: Giftcard; 
  public confirm: boolean;
  public confirm2: boolean;
    public save_giftcard:any;
   public statuss: string;
   public filesToUpload: Array<File>= new Array();
public status: string;
 public save_project:any;
 public consumedDate: string;
 public delete: boolean;

  constructor(private _giftcardService: GiftcardService,
private _router: Router,
private _route: ActivatedRoute,
private _uploadService: UploadService,

){

this.url=Global.url;
this.giftcard=new Giftcard('','',0,'','','','','',0,0,0,'','',0);
this.confirm=false;
this.confirm2=false;
this.statuss= "";
this.status= "";
this.consumedDate="";
this.delete=false;



 }

  ngOnInit(): void {

 this._route.params.subscribe(params =>{ //SUBSCRIBE PARA RECIBIR LOS PARAMETROS
      let id= this._route.snapshot.params.id; //
      this.getGiftcard(id);

    });


  }


 onSubmit (form: any){
      console.log(this.giftcard);
    //Guardar datos básicos
       this._giftcardService.updateGiftcard(this.giftcard).subscribe(
        response =>{
          if(response.giftcard){
          console.log(1);
            if(this.filesToUpload.length >=1 ){
              console.log(this.filesToUpload);
              console.log(2);
              this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[],this.filesToUpload,'image')
                      .then((result:any)=>{
                        console.log(result);
                          console.log(2);
                       this.save_project= result.project;//  ESTA SENTENCIA LA ESCRIBE CUANDO 
                       //INTENTA ACCEDER AL DETAIL DEL PROYECT Y NO PUEDE

                        this.status= 'success';

                        
                      });
            }else{
              this.save_project=response.project;
              this.status='success';
                 console.log(3);
            }
        
          
          }else{
          this.status = 'failed';
        }
        },
        error =>{console.log("NO HAY FILES TO UPLOAD");
        }
    );
   }



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
            this._router.navigate(['/giftcards']);
             console.log(response);
            if (response.giftcadrd){
              
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

      setDelete(confirm:any){
      this.delete=confirm;
      this.confirm2=confirm;
      }

      undoDelete(confirm:any){

        this.delete=!confirm;
        this.confirm2=!confirm;
      }






confirmarPago(form: any){



    console.log("Esta es la giftcard del front End");
    console.log(this.giftcard);
    this._giftcardService.saveGiftcard(this.giftcard).subscribe(
   
        response =>{
       if(response){


       this.statuss= 'success'; 
     
       localStorage.removeItem('buyerName');
       localStorage.removeItem("issuedDate");
       localStorage.removeItem("client");
       localStorage.removeItem("emailClient");
       localStorage.removeItem("buyerEmail");
       localStorage.removeItem("dni");
       localStorage.removeItem("phoneClient");
       localStorage.removeItem("amount");
        form.reset();
         form.reset();
          form.reset();





       }   
       console.log(response);   
       console.log("Guardado la giftcard en la base de datos!");
      
           

                  // 
            
         
                    
        },
        error =>{console.log(<any> error+"ESTA TIRANDO ERROR NO SE PORQUE");}
    );






}




resetForm(form1: any,form2:any):void{
  form1.reset();
  form2.reset();
}




upload (form: any){
      console.log(this.giftcard);
    //Guardar datos básicos
       this._giftcardService.updateGiftcard(this.giftcard).subscribe(
        response =>{
          if(response.giftcard){
          console.log("Hay respuesta");

          form.reset();

        this._router.navigate(['/giftcards']);
        //window.location.href = response.response.init_point;

            
                     
              this.save_giftcard=response.giftcard;
              this.status='success';
                 console.log(3);
                      }else{
          this.status = 'failed';
        }
        },
        error =>{console.log("Falla de edición en el update.");

        }
    );
   }


}
