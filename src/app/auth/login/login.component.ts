import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare var gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2:any;

  public loginForm = this.fb.group({

    email:[localStorage.getItem('email')|| '',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    remenber:[true]
  });

  ////////////////////////////////////////////////CONSTRUCTOR///////////////////////////////////////////////////////

  constructor(  private router:Router,
                private fb:FormBuilder, 
                private usuarioService:UsuarioService,
                private ngzone:NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }


  login(){
    this.usuarioService.login(this.loginForm.value)
                        .subscribe(resp =>{
                        // si el usuario se logea correctamente
                          if( this.loginForm.get('remenber')?.value){
                            localStorage.setItem('email',this.loginForm.get('email')?.value)
                          }
                          else{
                            localStorage.removeItem('email')
                          }
                          // console.log('Usuarios Logeado');
                          this.router.navigateByUrl('/');

                          console.log(resp);


                        
                        },(err) => {
                          //si sucede un error
                          Swal.fire('Error','Valide bien los datos11','error');
                          localStorage.removeItem('email')

                        });
    
  }

  renderButton() {
      gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
    

  }

  async startApp() {
      await this.usuarioService.googleInit();
      
      this.auth2 = this.usuarioService.auth2;

      this.attachSignin(document.getElementById('google-btn'));

  }

  attachSignin(element:any) {
    
    this.auth2.attachClickHandler(element, {},
        (googleUser:any) =>{
            const id_token = googleUser.getAuthResponse().id_token;
            this.usuarioService.loginGoogle(id_token).subscribe(res => {
              this.ngzone.run(()=>{
                this.router.navigateByUrl('/');// cuando ya se logeo
              })
              
            });
            

        }, function(error:any) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


}
