
//le importamos todos los modulos necesarios para crear el servicio

import {Injectable} from '@angular/core';
//http para hacer peticiones Ajax
import{HttpClient, HttpHeaders} from '@angular/common/http';
//importamos la clase OBservable de la libreria rxjs
import{Observable} from 'rxjs';
//importamos la clase
import{Report} from '../models/report';
//importamos el fichero de variables globales
import {Global} from './global';
import{ReportService} from '../../services/report.service';



//con el el decorador Inyectable
@Injectable()
export class ReportService{


	public url: string;

	constructor(private _http: HttpClient)	{
		this.url= Global.url;
		}
	

		  // Este es el endpoint de mi backend
	


	SaveReport(form:any){


    this._giftcardService.buyGiftcard(this.giftcard).subscribe(
       
            response =>{
              
             
           console.log("Realizando petición a mercado y preparando checkout...");
          
           console.log(response.response.init_point);   
     /* CON LA RESPONSE QUE ME LLEGA DEL BACKEND  REDIRECCION AL USUARIO*/
      window.location.href = response.response.init_point;
          //this.init_point = result.data.result;
        
          
     //window.location.href = this.init_point;
                
                form.reset();
                
             
                        
            },
            error =>{console.log(<any> error+"ESTA TIRANDO ERROR NO SE PORQUE");}
        );


}





}