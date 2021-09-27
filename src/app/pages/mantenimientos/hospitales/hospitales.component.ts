import { Component,OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospitales.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitaleService } from 'src/app/services/hospitale.service';
import { ModelImagenService } from 'src/app/services/model-imagen.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy {
  public hospitales?:Hospital[];

  public hospitalesTemp:Hospital[]=[];

  public cargando?:boolean = false;
  public imgsubs ?:Subscription;

  constructor( private hospitalServices:HospitaleService,
              private busquedaService:BusquedasService,
              private modalImagenService:ModelImagenService) { }

              ngOnDestroy():void{
    this.imgsubs?.unsubscribe();
  }
              
  ngOnInit(): void {
    this.cargandoHospitales()

    this.imgsubs = this.modalImagenService.nuevaImagen?.subscribe(img => {
      this.cargandoHospitales()
    })

  }
  cargandoHospitales(){
    this.cargando = true
    this.hospitalServices.cargarHospitales()
                        .subscribe(hospitales =>{

                          this.cargando = false
                          
                          this.hospitalesTemp = hospitales;

                          this.hospitales=hospitales;




                          
                          
                        })
  }
  guardarHospital(hospital:any){


    this.hospitalServices.actualizarHospital(hospital.nombre,hospital.uid)
                          .subscribe(resp=>{
                            this.cargandoHospitales();
                            Swal.fire('Actualizado',hospital.nombre,'success')
                          })
    
  }
  eliminarHospital(hospital:any){
    this.hospitalServices.eliminarHospital(hospital.uid)
                          .subscribe(resp => {
                            this.cargandoHospitales();
                            Swal.fire('Eliminado',hospital.nombre,'success')

                          })
  }
  async abrirSwal(){
    const {value} = await Swal.fire<string>({
        title:'Crear un nuevo Hospital',
        input: 'text',
        text:'Ingrese el nuevo Hospital',
        inputPlaceholder: 'Nombre del hospital',
        showCancelButton: true
      })
      if(value!.trim().length >0){
        this.hospitalServices.crearHospital(value!)
                              .subscribe(resp => {
                                Swal.fire({
                                  icon: 'success',
                                  title: 'Your work has been saved',
                                  showConfirmButton: false,
                                  timer: 1000
                                })
                                this.cargandoHospitales();
                                
                              })
      }

      
  }
  abrirModal(hospital:any){

    this.modalImagenService.abrilModal('hospitales',hospital.uid,hospital.img);
    
  }
  buscar(termino:string){

    if(termino.length === 0){
      this.hospitales = this.hospitalesTemp;
      return ;
    }

    this.busquedaService.buscarm('hospital',termino)
                        .subscribe(resp => {
                          this.hospitales = resp;
                        })
  }
  


}
