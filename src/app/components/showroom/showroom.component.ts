import { Component, OnInit } from '@angular/core';
import {Giftcard} from '../../models/giftcard';
import {Report} from '../../models/report';
import{GiftcardService} from '../../services/giftcard.service';

import {Router } from '@angular/router';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit {

  private giftcard : Giftcard;
  public report: Report;

  constructor(private _giftcardService: GiftcardService,  private router: Router) {

   this.giftcard= new Giftcard('','',0,'','','','','',0,0,0,'','',0);
   this.report= new Report('','','','',0);

   }

  ngOnInit(): void {

    
  }

 checkout5000(){


this.router.navigate(['/checkout'], { queryParams: { amount: this.giftcard.amount=5000} });
this.giftcard= new Giftcard('','',0,'','','','','',0,0,0,'','',0);
 window.scrollTo(0, 0);  
console.log(this.giftcard);

}

checkout10000(){
this.giftcard= new Giftcard('','',0,'','','','','',0,0,0,'','',0);
this.router.navigate(['/checkout'], { queryParams: { amount: this.giftcard.amount=10000} });
 window.scrollTo(0, 0);
}
  

reportarProblema(form:any) {

  
console.log("Aquí se enviará");
console.log(this.report);

this._giftcardService.saveReport(this.report).subscribe(

response=>{

  if(response){

    console.log("El siguiente reporte ha sido enviado.");
    form.reset();

  }
},


error =>{

console.log(<any>error+"No hay respuesta del backend" )

},


  )




}




}
