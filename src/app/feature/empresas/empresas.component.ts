import { Component } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {
  empresas: any[] = [];
  isPopupVisible = false;
  isUpdating = false;
  currentEmpresa: any = { nombre: '', email: '', telefono: '', direccion: '', fechaFundacion: null };

  constructor(private empresasService: EmpresasService) {}

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.empresas = this.empresasService.getEmpresas();
  }

  agregarEmpresa() {
    this.isUpdating = false;
    this.currentEmpresa = { nombre: '', email: '', telefono: '', direccion: '', fechaFundacion: null };
    this.isPopupVisible = true;
  }

  editarEmpresa(event: any) {
    this.isUpdating = true;
    this.currentEmpresa = { ...event.row.data }; // Corrige la referencia al evento del DataGrid
    this.isPopupVisible = true;
  }
  

  guardarEmpresa() {
    if (!this.currentEmpresa.nombre || !this.currentEmpresa.email || !this.currentEmpresa.telefono) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
  
    if (this.isUpdating) {
      this.empresasService.updateEmpresa(this.currentEmpresa.id, this.currentEmpresa);
    } else {
      this.empresasService.addEmpresa({ ...this.currentEmpresa, id: Date.now() });
    }
  
    this.isPopupVisible = false;
    this.loadEmpresas();
  }

 
  eliminarEmpresa(event: any) {
    if (confirm('¿Está seguro de que desea eliminar esta empresa?')) {
      const id = event.row.data.id;
      this.empresasService.deleteEmpresa(id);
      this.loadEmpresas();
    }
  }

  cancelarEdicion() {
    this.isPopupVisible = false;
    this.currentEmpresa = { nombre: '', email: '', telefono: '', direccion: '', fechaFundacion: null };
  }
}
