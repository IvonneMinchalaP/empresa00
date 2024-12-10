import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private empresas = [
    { id: 1, 
      nombre: 'Empresa A', 
      email: 'contacto@empresaA.com', 
      telefono: '123456789',
      direccion: 'Calle 1', 
      fechaFundacion: '2000-01-01'
    },
    
    { id: 2,
      nombre: 'Empresa B', 
      email: 'contacto@empresaB.com', 
      telefono: '987654321',
      direccion: 'Calle 2', 
      fechaFundacion: '2010-05-15' },
  ];

  getEmpresas() {
    return this.empresas;
  }

  addEmpresa(empresa: any) {
    this.empresas.push(empresa);
  }

  updateEmpresa(id: number, updatedData: any) {
    const empresa = this.empresas.find(e => e.id === id);
    if (empresa) Object.assign(empresa, updatedData);
  }

  deleteEmpresa(id: number) {
    this.empresas = this.empresas.filter(e => e.id !== id);
  }
}