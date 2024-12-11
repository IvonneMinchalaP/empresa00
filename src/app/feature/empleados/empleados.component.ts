import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { jsPDF } from 'jspdf';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToPDF } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToExcel } from 'devextreme/excel_exporter';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  
  empleados: any[] = [];
  // Controla la visibilidad del popup
  isPopupVisible = false; 
  // Determina si es agregar o actualizar
  isUpdating = false; 
  currentEmpleado: any = {  nombre: '', email: '', puesto: '', telefono: '', fechaIngreso: null};

  
  constructor(private empleadosService: EmpleadosService  ) {
  }

  ngOnInit(): void {
    this.loadEmpleados();
  }

  // Cargar la lista de empleados
  loadEmpleados() {
    this.empleados = this.empleadosService.getEmpleados();
  }

  agregarEmpleado() {
    this.isUpdating = false;
    this.currentEmpleado = {  nombre: '', apeliddo: '', email: '', puesto: '', telefono: '', fechaIngreso: null};
    // Muestra el popup
    this.isPopupVisible = true; 
  }
  
  editarEmpleado(event: any) {
   this.isUpdating = true;
     //Carga los datos del empleado seleccionado
    this.currentEmpleado = { ...event.row.data}; 
    this.currentEmpleado = { ...this.empleados}; 
     //Muestra el popup
    this.isPopupVisible = true; 
  }

  guardarEmpleado() {
    
    if (this.isUpdating) {
      this.empleadosService.updateEmpleado(this.currentEmpleado.id, this.currentEmpleado );
      //this.currentEmpleado = { ...event.row.data };
    } else {
      this.empleadosService.addEmpleado({ ...this.currentEmpleado, id: Date.now() });
    }
    // Oculta el popup
    this.isPopupVisible = false; 
    // Recarga los datoss
    this.loadEmpleados(); 
  }

  eliminarEmpleado(event:any) {
    const id = event.row.data.id;
    this.empleadosService.deleteEmpleado(id);
    this.loadEmpleados();
  }
  // Cancelar la edición o adición
  cancelarEdicion() {
    this.isPopupVisible = false;
  }

  onExporting(e: any) {
    const format = e.format;

    if (format === 'pdf') {
      const doc = new jsPDF();
      exportDataGridToPDF({
        jsPDFDocument: doc,
        component: e.component,
        indent: 5
      }).then(() => {
        doc.save('Empleados.pdf');
      });
    } else if (format === 'xlsx') {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Empleados');

      exportDataGridToExcel({
        component: e.component,
        worksheet,
        autoFilterEnabled: true
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            'Empleados.xlsx'
          );
        });
      });
    }

    e.cancel = true;
  }

}
//  exportarPDF(e: DxDataGridTypes.ExportingEvent)  exportarExcel(e: DxDataGridTypes.ExportingEvent) {

 