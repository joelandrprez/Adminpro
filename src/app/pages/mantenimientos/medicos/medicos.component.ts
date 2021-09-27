import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModelImagenService } from 'src/app/services/model-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public cargando?:boolean = false;

  public medicos?:Medico[];

  public medicosTemp:Medico[]=[];


  public imgsubs ?:Subscription;

  constructor(private medicoService:MedicoService,
              private busquedaService:BusquedasService,
              private modalImagenService:ModelImagenService

              ) { }

  ngOnInit(): void {
    this.cargandoMedicos()

    this.imgsubs = this.modalImagenService.nuevaImagen?.subscribe(img => {
      this.cargandoMedicos()
    })
  }
  cargandoMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
                      .subscribe(resp => {
                        this.cargando = false;
                        this.medicosTemp = resp
                        this.medicos = resp;
                        
                      })

  }
  buscar(termino:string){

    if(termino.length === 0){
      this.medicos = this.medicosTemp;
      return ;
    }
    this.busquedaService.buscarm('medicos',termino)
                        .subscribe(resp => {
                          this.medicos = resp;
                        })
  }
  abrirModal(medicos:any){
    this.modalImagenService.abrilModal('medicos',medicos.uid,medicos.img);
    
  }
  eliminarMedico(medico:any){
    this.medicoService.eliminarMedico(medico.uid).subscribe(resp =>{
      this.cargandoMedicos();
      Swal.fire('Eliminado',medico.nombre,'success')
    })

  }


}
