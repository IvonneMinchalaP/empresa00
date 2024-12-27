import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private empresas = [
    { EmpresaID: 1, 
      Nombre: 'E-Mart', 
      Email: 'contacto@empresaA.com', 
      Telefono: '123456789',
      Ciudad: 'Bentonville', 
      Estado: 'California',
      FechaFundacion: '2000-01-01'
    },
    
    { EmpresaID: 2,
      Nombre: 'StereoShack ', 
      Email: 'contacto@empresaB.com', 
      Telefono: '987654321',
      Ciudad: 'Minneapolis', 
      Estado:'Pennsylvania',
      FechaFundacion: '2010-05-15' },

      { EmpresaID: 3, 
        Nombre: 'Circuit Town', 
        Email: 'contacto@empresaC.com', 
        Telefono: 'Issaquah',
        Ciudad: 'Bentonville', 
        Estado: 'Georgia',
        FechaFundacion: '2015-01-13'
      },
      
      { EmpresaID: 4,
        Nombre: 'ElectrixMax', 
        Email: 'contacto@empresaD.com', 
        Telefono: '1938746538',
        Ciudad: 'Hoffman Estates', 
        Estado: 'California',
        FechaFundacion: '2020-09-1' 
      },
      
      { EmpresaID: 5,
        Nombre: 'Video Emporium', 
        Email: 'contacto@empresaE.com', 
        Telefono: '0192838476',
        Ciudad: 'Bentonville', 
        Estado: 'Georgia',
        FechaFundacion: '2024-08-15' 
      },
      
      { EmpresaID: 6,
        Nombre: 'Braeburn', 
        Email: 'contacto@empresaD.com', 
        Telefono: '0876435678',
        Ciudad: 'Minnesota',
        Estado:'Washington', 
        FechaFundacion: '2024-07-15' 
      },
  ];

  getEmpresas() {
    return this.empresas;
  }

  addEmpresa(empresa: any) {
    this.empresas.push(empresa);
  }

  updateEmpresa(EmpresaID: number, updateEmpresa: any) {
    const index = this.empresas.findIndex((empr) => empr.EmpresaID === EmpresaID);
    if (index !== -1) {
      this.empresas[index] = { ...this.empresas[index], ...updateEmpresa };
    }
  }

  deleteEmpresa(EmpresaID: number) {
    this.empresas = this.empresas.filter(e => e.EmpresaID !== EmpresaID);
  }
}