import { Component } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { jsPDF } from 'jspdf';
import * as ExcelJS from 'exceljs'; 
import autoTable from 'jspdf-autotable';

interface ExportMenuVisible {
  excel: boolean;
  pdf: boolean;
}
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {
  exportMenuVisible: ExportMenuVisible;
  selectedRows: any[] = [];

  empresas: any[] = [];
  isPopupVisible = false;
  isUpdating = false;
  currentEmpresa: any = { Nombre: '', Email: '', Telefono: '', Ciudad: '', Estado: '', FechaFundacion: null };

  constructor(private empresasService: EmpresasService) {
    this.exportMenuVisible = {
      excel: false,
      pdf: false
    };
  }

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.empresas = this.empresasService.getEmpresas();
  }

  agregarEmpresa() {
    this.isUpdating = false;
    this.currentEmpresa = { Nombre: '', Email: '', Telefono: '', Ciudad: '',Estado:'', FechaFundacion: null };
    this.isPopupVisible = true;
  }

  editarEmpresa(event: any) {
    this.isUpdating = true;
    this.currentEmpresa = { ...event.row.data }; // Corrige la referencia al evento del DataGrid
    this.isPopupVisible = true;
  }
  

  guardarEmpresa() {
    if (!this.currentEmpresa.Nombre || !this.currentEmpresa.Email || !this.currentEmpresa.Telefono) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
  
    if (this.isUpdating) {
      this.empresasService.updateEmpresa(this.currentEmpresa.EmpresaID, this.currentEmpresa);
    } else {
      this.empresasService.addEmpresa({ ...this.currentEmpresa, EmpresaID: Date.now() });
    }
  
    this.isPopupVisible = false;
    this.loadEmpresas();
  }

 
  eliminarEmpresa(event: any) {
    if (confirm('¿Está seguro de que desea eliminar esta empresa?')) {
      const EmpresaID = event.row.data.id;
      this.empresasService.deleteEmpresa(EmpresaID);
      this.loadEmpresas();
    }
  }

  cancelarEdicion() {
    this.isPopupVisible = false;
    this.currentEmpresa = { Nombre: '', Email: '', Telefono: '', Ciudad: '',Estado:'',FechaFundacion: null };
  }
   // Método que usa el índice
   toggleExportMenu(menu: keyof ExportMenuVisible): void {
    this.exportMenuVisible[menu] = !this.exportMenuVisible[menu];
  }


  exportGrid(format: string, selected: boolean) {
    const data = selected ? this.getSelectedRows() : this.empresas;

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
      { header: 'Teléfono', dataKey: 'telefono' },
      { header: 'Ciudad', dataKey: 'ciudad' },
      { header: 'Estado', dataKey: 'estado' },
      { header: 'Fecha de Fundacion', dataKey: 'fechaFundacion' },
    ];
  

    doc.addImage(logo1Path, 'PNG', 10, 10, imgWidth, imgHeight);
    doc.addImage(logo2Path, 'PNG', 160, 10, imgWidth, imgHeight);

    doc.setFontSize(16);
    doc.text('Reporte de Empresas', 105, 30, { align: 'center' });

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
    doc.save('empresa.pdf');
  }

  exportToExcel(data: any[]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Empresa');

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

   // Agregar el primer logo 
   
   worksheet.addImage(logo1, {
    tl: { col: 0, row: 0 },
    ext: { width: 130, height: 50 },
    
  });

    const titleRow = worksheet.addRow(['', '', 'Reporte de Empresa']);
    worksheet.mergeCells('C2:E2'); 
    titleRow.font = { bold: true, size: 16 };
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Agregar el segundo logo 
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
    const headers = ['ID', 'Nombre', 'Correo', 'Teléfono', 'Ciudad', 'Estado', 'Fecha de Fundacion'];
    
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
  data.forEach(empr => {
    const row = worksheet.addRow([empr.EmpresaID, empr.Nombre, empr.Email, empr.Telefono, empr.Ciudad,empr.Estado, empr.FechaFundacion]);
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
      a.download = 'empresa.xlsx';
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
