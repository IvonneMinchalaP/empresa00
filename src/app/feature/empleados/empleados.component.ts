import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { jsPDF } from 'jspdf';
import * as ExcelJS from 'exceljs'; 
import autoTable from 'jspdf-autotable';

interface ExportMenuVisible {
  excel: boolean;
  pdf: boolean;
}

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})

export class EmpleadosComponent implements OnInit {
  exportMenuVisible: ExportMenuVisible;
  selectedRows: any[] = [];


  empleados: any[] = [];
  // Controla la visibilidad del popup
  isPopupVisible = false;
  // Determina si es agregar o actualizar
  isUpdating = false;
  currentEmpleado: any = {  nombre: '', email: '', puesto: '', telefono: '', empres: '', fechaIngreso: null};
  accordionOpen = false;

  constructor(private empleadosService: EmpleadosService  ) {
    this.exportMenuVisible = {
      excel: false,
      pdf: false
    };

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
    this.currentEmpleado = {  nombre: '', apeliddo: '', email: '', puesto: '', telefono: '', empres:'', fechaIngreso: null};
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

 // Método que usa el índice
  toggleExportMenu(menu: keyof ExportMenuVisible): void {
    this.exportMenuVisible[menu] = !this.exportMenuVisible[menu];
  }


  exportGrid(format: string, selected: boolean) {
    const data = selected ? this.getSelectedRows() : this.empleados;

    if (data.length === 0) {
      alert('No hay datos seleccionados para exportar.');
      return;
    }

    if (format === 'excel') {
      this.exportToExcel(data);
    } else if (format === 'pdf') {
      this.exportToPDF(data);
    }
  }

  
  exportToPDF(data: any[]) {
    const doc = new jsPDF();

    // Rutas de los logos
    const logo1Path = 'assets/images/icon/logo1.png';
    const logo2Path = 'assets/images/icon/logo2.png';

    const imgWidth = 30;
    const imgHeight = 15;

    const columns = [
      { header: 'ID', dataKey: 'id' },
      { header: 'Nombre', dataKey: 'nombre' },
      { header: 'Correo', dataKey: 'email' },
      { header: 'Puesto', dataKey: 'puesto' },
      { header: 'Teléfono', dataKey: 'telefono' },
      { header: 'Empresa', dataKey: 'empres' },
      { header: 'Fecha de Ingreso', dataKey: 'fechaIngreso' },
    ];
  

    doc.addImage(logo1Path, 'PNG', 10, 10, imgWidth, imgHeight);
    doc.addImage(logo2Path, 'PNG', 160, 10, imgWidth, imgHeight);

    doc.setFontSize(16);
    doc.text('Reporte de Empleados', 105, 30, { align: 'center' });

    // Filtrar los datos seleccionados
     const filteredData = data;
    // Agregar tabla con sombreado en encabezados
    autoTable(doc, {
      head: [columns.map(c => c.header)],
      body: filteredData.map(emp => columns.map(c => emp[c.dataKey])),
      styles: { lineColor: [0, 0, 0], lineWidth: 0.1 },
      startY: 50,
      headStyles: { fillColor: [200, 200, 200] }, // Encabezado sombreado
    });
    doc.setFontSize(12);
    doc.text("Usuario: Admin", 6, 290);
    doc.text("Fecha exportacion: 12/12/2024", 146, 290);
    doc.save('empleados.pdf');
  }

  exportToExcel(data: any[]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Empleados');

      // Función para convertir imagen a base64
    const imageToBase64 = (path: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const img = new Image();
        img.src = path;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png').split(',')[1]); // Obtiene solo la parte base64
        };

        img.onerror = (error) => reject(error);
      });
    };

  // Convertir ambas imágenes a base64
  Promise.all([
    imageToBase64('assets/images/icon/logo1.png'),
    imageToBase64('assets/images/icon/logo2.png')
  ]).then(([logo1Base64, logo2Base64]) => {
    const logo1 = workbook.addImage({
      base64: logo1Base64,
      extension: 'png',
    });
    const logo2 = workbook.addImage({
      base64: logo2Base64,
      extension: 'png',
    });

   // Agregar el primer logo en las celdas combinadas A1:B1
   
   worksheet.addImage(logo1, {
    tl: { col: 0, row: 0 },
    ext: { width: 130, height: 50 },
    
  });

    const titleRow = worksheet.addRow(['', '', 'Reporte de Empleados']);
    worksheet.mergeCells('C2:E2'); // Combina las celdas C1 a E1 para el título
    titleRow.font = { bold: true, size: 16 };
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Agregar el segundo logo en las celdas combinadas E1:F1
    worksheet.addImage(logo2, {
      tl: { col: 5, row: 0 },
      ext: { width: 120, height: 50 },
    });

    // Subtítulo
    const subtitleRow = worksheet.addRow(["Usuario: Admin", "  ", "Fecha exportación: 12/12/2024" ]);
    subtitleRow.alignment = { horizontal: 'left' };

    // Espacio entre títulos y encabezado
    worksheet.addRow([]);

      // Encabezados
    const headers = ['ID', 'Nombre', 'Correo', 'Puesto', 'Teléfono', 'Empresa', 'Fecha de Ingreso'];
    
    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true };
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD3D3D3' }
      };
      cell.border = { bottom: { style: 'thin' } };
    });


  // Agregar datos con bordes
  data.forEach(emp => {
    const row = worksheet.addRow([emp.id, emp.nombre, emp.email, emp.puesto, emp.telefono, emp.empres, emp.fechaIngreso]);
    row.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  });

  //Ajustar tamaño de columnas
  worksheet.columns.forEach(column => {
    column.width = column.header && column.header.length < 17 ? 17 : (column.header?.length || 17);  });
  

  // Exportar
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'empleados.xlsx';
      a.click();
    });
    }).catch(error => {
      console.error('Error al convertir las imágenes a base64:', error);
  });

}


  onSelectionChanged(e: any) {
    this.selectedRows = e.selectedRowsData;
  }
  
  getSelectedRows(): any[] {
    return this.selectedRows;
  }

  
}










