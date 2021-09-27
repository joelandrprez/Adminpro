interface _hospitalUser{
     nombre:string,
     uid:string,
     img:string,  
}

import { environment } from "src/environments/environment";


const base_url = environment.base_url;

export class Hospital {
    constructor(
        public nombre:string,
        public uid?:string,
        public img?:string,
        public usuario?:_hospitalUser
    ) {
        
    }
}