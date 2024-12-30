import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private empresas = [
    {},  ];

  getEmpresas() {
    return this.empresas;
  }

  addEmpresa(empresa: any) {
    this.empresas.push(empresa);
  }

  updateEmpresa(EmpresaID: number, updateEmpresa: any) {
    // const index = this.empresas.findIndex((empr) => empr.EmpresaID === EmpresaID);
    // if (index !== -1) {
    //   this.empresas[index] = { ...this.empresas[index], ...updateEmpresa };
    // }
  }

  deleteEmpresa(EmpresaID: number) {
    //this.empresas = this.empresas.filter(e => e.EmpresaID !== EmpresaID);
  }
}