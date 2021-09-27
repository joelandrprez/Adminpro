import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospitales.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitaleService } from 'src/app/services/hospitale.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm?:FormGroup;
  public hospitales?:Hospital[];
  public hospitalSeleccionado?:Hospital;

  public medicoSeleccionado?:Medico;

  constructor(
              private fb : FormBuilder,
              private hospitalServices:HospitaleService,
              private medicoServices:MedicoService,
              private router:Router,
              private activatedRoute:ActivatedRoute
  ) {  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id}) => {

      this.cargarMedico(id);
      
    })
  
    this.cargarHospitales();
    

    this.medicoForm =  this.fb.group({
      nombre:['',Validators.required],
      hospital:['',Validators.required]
    })
    this.medicoForm.get('hospital')?.valueChanges.subscribe(
      resp => {
        
        
        this.hospitalSeleccionado = this.hospitales?.find(h =>h.uid  === resp);

        
      }
    )

  }
  guardarMedico(  ){


    const data = {
      ...this.medicoForm?.value,
      _id:this.medicoSeleccionado?.uid
    }
    if(this.medicoSeleccionado){

      this.medicoServices.actualizarMedico(data)
                          .subscribe( resp => {
                            Swal.fire(
                              'Actualizado',`${data.nombre} Actualzidado correctamente`,'success'
                            )


                            
                          })

    }else{
      const {nombre} = this.medicoForm?.value

      this.medicoServices.crearMedico(this.medicoForm?.value)
                          .subscribe((resp:any) => {
                            Swal.fire(
                              'Creado',`${nombre} Creado correctamente`,'success'
                            )
                            this.router.navigateByUrl(`/dashboard/medicos/${resp.medico.uid}`)
                          })
    }
    




  }



  cargarHospitales(){

    this.hospitalServices.cargarHospitales()
                          .subscribe((resp : any[]) => {

                            this.hospitales = resp;
                            
                          })
  }

  cargarMedico(id:string){
    if(id === 'nuevo'){
      return ;
    }

    
    this.medicoServices.obtenerMedicoporId(id)
                        .pipe(
                          delay(100)
                        )
                        .subscribe( (resp:any) => {
                          if(!resp){
                            
                              this.router.navigateByUrl(`/dashboard/medicos`)
                              return;
                            
                          }else{
                            const {nombre,hospital:{_id}} = resp
                            this.medicoSeleccionado = resp;
                            this.medicoForm?.setValue({nombre,hospital:_id})
                          }



                          
                        })
  }


}
