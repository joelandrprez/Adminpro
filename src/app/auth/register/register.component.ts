import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AbstractControlOptions} from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})


export class RegisterComponent  {

  public formSubmitted = false;

  public registerForm = this.fb.group({

    nombre:['Joel Perez',[Validators.required]],
    email:['joanpeq@gmail.com',[Validators.required,Validators.email]],
    password:['ADOtata159',[Validators.required]],
    password2:['ADOtata159',[Validators.required]],
    terminos:[false,[Validators.requiredTrue]]
  },{
    validators:this.contrasenasIguales('password','password2')
  }as AbstractControlOptions);






  constructor(  private fb:FormBuilder, 
                private usuarioService:UsuarioService,
                private router:Router) { }


  creaUsuario(){
    
    this.formSubmitted = true;

    console.log(this.registerForm.value);

    if( this.registerForm.invalid ){
      return;
      
    }
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp =>{
      this.router.navigateByUrl('/');
      console.log('usuarios creado');

      console.log(resp);

      
    },(err) => {
        //si sucede un error
        Swal.fire('Error',err.error.msg,'error');
    });
      
    
    
  }






  campoNoValido( campo:string ):boolean{
    
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      
      return true;
    }else{
      return false;
    }    
  
  }
  contrasenasValida(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( (pass1 !== pass2) && this.formSubmitted){
      return true;
    }else{
      return false
    }


  }
  contrasenasIguales(pass1:string,pass2:string){


    return (formGroup:FormGroup) =>{
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsIgual:true})
      }

    }

  }
  

}
