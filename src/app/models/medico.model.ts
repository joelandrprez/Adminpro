interface _medicoUser{
    nombre:string,
    uid:string,
    img:string,  
}

import { environment } from "src/environments/environment";
import { Hospital } from "./hospitales.model";


const base_url = environment.base_url;

export class Medico {
   constructor(
       public nombre:string,
       public uid?:string,
       public img?:string,
       public usuario?:_medicoUser,
       public hospital?:Hospital
   ) {
       
   }
}