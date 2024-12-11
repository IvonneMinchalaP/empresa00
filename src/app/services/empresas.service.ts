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

      { id: 1, 
        nombre: 'Empresa C', 
        email: 'contacto@empresaC.com', 
        telefono: '0987654345',
        direccion: 'Calle 3', 
        fechaFundacion: '2015-01-13'
      },
      
      { id: 2,
        nombre: 'Empresa D', 
        email: 'contacto@empresaD.com', 
        telefono: '1938746538',
        direccion: 'Calle 4', 
        fechaFundacion: '2020-09-1' 
      },
      
      { id: 2,
        nombre: 'Empresa E', 
        email: 'contacto@empresaE.com', 
        telefono: '0192838476',
        direccion: 'Calle 5', 
        fechaFundacion: '2024-08-15' 
      },
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