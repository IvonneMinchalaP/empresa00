import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private empresas = [
    { id: 1, 
      nombre: 'E-Mart', 
      email: 'contacto@empresaA.com', 
      telefono: '123456789',
      ciudad: 'Bentonville', 
      estado: 'California',
      fechaFundacion: '2000-01-01'
    },
    
    { id: 2,
      nombre: 'StereoShack ', 
      email: 'contacto@empresaB.com', 
      telefono: '987654321',
      ciudad: 'Minneapolis', 
      estado:'Pennsylvania',
      fechaFundacion: '2010-05-15' },

      { id: 3, 
        nombre: 'Circuit Town', 
        email: 'contacto@empresaC.com', 
        telefono: 'Issaquah',
        ciudad: 'Bentonville', 
        estado: 'Georgia',
        fechaFundacion: '2015-01-13'
      },
      
      { id: 4,
        nombre: 'ElectrixMax', 
        email: 'contacto@empresaD.com', 
        telefono: '1938746538',
        ciudad: 'Hoffman Estates', 
        estado: 'California',
        fechaFundacion: '2020-09-1' 
      },
      
      { id: 5,
        nombre: 'Video Emporium', 
        email: 'contacto@empresaE.com', 
        telefono: '0192838476',
        ciudad: 'Bentonville', 
        estado: 'Georgia',
        fechaFundacion: '2024-08-15' 
      },
      
      { id: 6,
        nombre: 'Braeburn', 
        email: 'contacto@empresaD.com', 
        telefono: '0876435678',
        ciudad: 'Minnesota',
        estado:'Washington', 
        fechaFundacion: '2024-07-15' 
      },
  ];

  getEmpresas() {
    return this.empresas;
  }

  addEmpresa(empresa: any) {
    this.empresas.push(empresa);
  }

  updateEmpresa(id: number, updateEmpresa: any) {
    const index = this.empresas.findIndex((empr) => empr.id === id);
    if (index !== -1) {
      this.empresas[index] = { ...this.empresas[index], ...updateEmpresa };
    }
  }

  deleteEmpresa(id: number) {
    this.empresas = this.empresas.filter(e => e.id !== id);
  }
}