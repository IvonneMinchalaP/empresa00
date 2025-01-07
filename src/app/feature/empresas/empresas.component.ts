import { Component, ViewChild } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { jsPDF } from 'jspdf';
import * as ExcelJS from 'exceljs';
import autoTable from 'jspdf-autotable';
import { DxDataGridComponent } from 'devextreme-angular';

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
  currentEmpresa: any = { Nombre: '', Email: '', Telefono: '', Ciudad: '',Estado:'',FechaFundacion: new Date() };

  
  token: string = ''; // Almacenar el token del usuario
  usuarioID: number = 0; // Almacenar el ID del usuario

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

  
  constructor(private empresasService: EmpresasService) {
    this.exportMenuVisible = {
      excel: false,
      pdf: false
    };
  }

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas(): void {
    this.empresasService.obtenerEmpresas().subscribe(
      (data: any) => {
        if (data && data.empresas) {
          this.empresas = data.empresas.map((empresa: any) => {
            if (empresa.FechaFundacion) {
              empresa.FechaFundacion = new Date(empresa.FechaFundacion); // Convertir a Date
            }
            return empresa;
          });
        } else {
          console.error('No se encontraron empresas');
        }
      },
      (error) => {
        console.error('Error al cargar empresas', error);
      }
    );
  }

  
  mostrarPopup(): void {
    this.isPopupVisible = true;
  }

  cerrarPopup(): void {
    this.isPopupVisible = false;
  }

  cancelarEdicion() {
    this.isPopupVisible = false;
    this.currentEmpresa = { Nombre: '', Email: '', Telefono: '', Ciudad: '',Estado:'',FechaFundacion: new Date() };
 }

 guardarOEditarEmpleado(): void {
  const empresaParaGuardar = {
    ...this.currentEmpresa,
    FechaFundacion: this.currentEmpresa.FechaFundacion
      ? new Date(this.currentEmpresa.FechaFundacion).toISOString().split('T')[0] // Convertir a string (formato YYYY-MM-DD)
      : undefined,
  };

  if (this.currentEmpresa.EmpresaID) {
    // Actualizar Empresa
    this.empresasService.actualizarEmpresa(empresaParaGuardar).subscribe({
      next: () => {
        const index = this.empresas.findIndex(e => e.EmpresaID === this.currentEmpresa.EmpresaID);
        if (index !== -1) {
          this.empresas[index] = { ...empresaParaGuardar };
        }
        console.log('Empresa actualizado:', empresaParaGuardar);
        this.cargarEmpresas(); // Actualiza la lista de Empresa
        this.cerrarPopup();
      },
      error: (err) => console.error('Error al actualizar el Empresa:', err),
    });
  } else {
    // Agregar Empresa
    this.empresasService.agregarEmpresa(empresaParaGuardar).subscribe({
      next: (respuesta) => {
        console.log('Empresa agregado:', respuesta);
        this.cargarEmpresas(); // Actualiza la lista de Empresa
        this.cerrarPopup();
      },
      error: (err) => console.error('Error al agregar el Empresa:', err),
    });
  }
}


get tituloPopup(): string {
  return this.currentEmpresa?.EmpresaID ? 'Actualizar Empresa' : 'Agregar Empresa';
}


abrirPopup(empresa: any): void {
  if (!empresa) {
    console.error('No se ha seleccionado una Empresa para editar.');
    return;
  }
  this.empresasService.cargarEmpresa(empresa.EmpresaID).subscribe({
    next: (data: any) => {
      this.currentEmpresa = data;
      this.isPopupVisible = true;
    },
    error: (err) => console.error('Error al cargar los datos de la empresa:', err)
  });
}
  eliminarEmpresa(empresaID: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta empresa?')) {
      this.empresasService.eliminarEmpresa(empresaID).subscribe({
        next: (response) => {
          alert(response?.Mensaje || 'Empresa eliminada correctamente');
          this.cargarEmpresas(); // Recarga las empresas después de la eliminación
        },
        error: (error) => {
          alert('Error al eliminar la empresa');
          console.error(error);
        }
      });
    }
  }

  onEliminarClick(): void {
    const selectedRowKeys = this.dataGrid.instance.getSelectedRowKeys();
    if (selectedRowKeys.length > 0) {
      const empresaID = selectedRowKeys[0].EmpresaID;
      this.eliminarEmpresa(empresaID);
    } else {
      alert('Por favor, seleccione una empresa para eliminar.');
    }
  }

  
   // Método que usa el índice
   toggleExportMenu(menu: keyof ExportMenuVisible): void {
    this.exportMenuVisible[menu] = !this.exportMenuVisible[menu];
  }
    // Método para obtener la fecha actual
  getCurrentDate(): string {
     const today = new Date();
    return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
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
      { header: 'ID', dataKey: 'EmpresaID' },
      { header: 'Nombre', dataKey: 'Nombre' },
      { header: 'Correo', dataKey: 'Email' },
      { header: 'Teléfono', dataKey: 'Telefono' },
      { header: 'Ciudad', dataKey: 'Ciudad' },
      { header: 'Estado', dataKey: 'Estado' },
      { header: 'Fecha de Fundacion', dataKey: 'FechaFundacion' },
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
    const currentUser = sessionStorage.getItem('nombre') || 'Invitado'; // Usuario actual desde sessionStorage
    const exportDate = this.getCurrentDate(); // Fecha actual
    doc.text(`Usuario: ${currentUser}`, 6, 290);
    doc.text(`Fecha exportación: ${exportDate}`, 146, 290);

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

    // Subtítulo con el nombre del usuario logueado y la fecha actual
    const usuarioNombre = sessionStorage.getItem('nombre') || 'Usuario desconocido';
    const currentDate = this.getCurrentDate();
    const subtitleRow = worksheet.addRow([`Usuario: ${usuarioNombre}`, "", `Fecha exportación: ${currentDate}`]);    subtitleRow.alignment = { horizontal: 'left' };
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
