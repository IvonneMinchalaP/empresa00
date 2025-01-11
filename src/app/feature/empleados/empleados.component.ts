import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { jsPDF } from 'jspdf';
import * as ExcelJS from 'exceljs'; 
import autoTable from 'jspdf-autotable';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

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
  empleadosData: any[] = [];
 

  // Controla la visibilidad del popup
  isPopupVisible = false;
  accordionOpen = false;
  currentEmpleado: any = { Nombre: '', Email: '', Puesto: '', Telefono: '',FechaIngreso: new Date() };

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

    tooltipContent: string = '';
    target: any = null;
    tooltipVisible: boolean = false;
    contextMenuVisible: boolean = false;
    contextMenuTarget: any = null;
  constructor(private empleadosService: EmpleadosService  ) {
    this.exportMenuVisible = {
      excel: false,
      pdf: false
    };
    empleadosService.obtenerEmpleado().subscribe((data: any) => {
      this.empleados = data;
    });

  }

 ngOnInit(): void {
    this.cargarEmpleado();
    this.cargarEmpleadoData();
  }

  cargarEmpleado(): void {
    this.empleadosService.obtenerEmpleado().subscribe(
        (data: any) => {
          let dataArr : any[]= [];
          if (data && data.empleados) {
           
             data.empleados.map((empleado: any) => {
              if (empleado.FechaIngreso) {
                empleado.FechaIngreso = new Date(empleado.FechaIngreso); // Convertir a Date
              }
           
             dataArr.push(empleado);
            });
            this.empleados = dataArr;
            console.log('Empleado:', this.empleados);
          } else {
            dataArr=[];
            console.error('No se encontraron empleados');
          }
        },
        (error) => {
          console.error('Error al cargar empleados', error);
        }
      );
  }
  cargarEmpleadoData(): void {
    this.empleadosService.obtenerEmpleadoData().subscribe(
        (data: any) => {
          let dataArr : any[]= [];
          if (data && data.empleadosData) {
           
             data.empleadosData.map((empleado: any) => {
              if (empleado.FechaIngreso) {
                empleado.FechaIngreso = new Date(empleado.FechaIngreso); // Convertir a Date
              }
           
             dataArr.push(empleado);
            });
            this.empleadosData = dataArr;
            console.log('EmpleadosData cargado:', this.empleadosData);
          } else {
            dataArr=[];
            console.error('No se encontraron empleados Data');
          }
        },
        (error) => {
          console.error('Error al cargar empleados', error);
        }
      );
  }
 
   // Row dragging options for the first DataGrid
   rowDraggingOptions1 = {
    allowReordering: true,
    group: 'empleadosGroup',
    onAdd: (e: any) => {
      const item = e.itemData;
      this.empleados.push(item);
      this.empleadosData = this.empleadosData.filter(emp => emp.EmpleadoID !== item.EmpleadoID);
      console.log('onAdd', e.itemData, this.empleados);

    }
  };

  // Row dragging options for the second DataGrid
  rowDraggingOptions2 = {
    allowReordering: true,
    group: 'empleadosGroup',
    onAdd: (e: any) => {
      const item = e.itemData;
      this.empleadosData.push(item);
      this.empleados = this.empleados.filter(emp => emp.EmpleadoID !== item.EmpleadoID);
      console.log('onAdd', e.itemData, this.empleadosData);

    }
  };
  
  cerrarPopup(): void {
    this.isPopupVisible = false;
  }

  cancelarEdicion() {
    this.isPopupVisible = false;
    this.currentEmpleado = { Nombre: '', Email: '', Puesto: '', Telefono: '',FechaIngreso: new Date() };
 }
  mostrarPopup(): void {
    this.isPopupVisible = true;
  }

  guardarOEditarEmpleado(): void {
    const empleadoParaGuardar = {
      ...this.currentEmpleado,
      FechaIngreso: this.currentEmpleado.FechaIngreso
        ? new Date(this.currentEmpleado.FechaIngreso).toISOString().split('T')[0] // Convertir a string (formato YYYY-MM-DD)
        : undefined,
    };
  
    if (this.currentEmpleado.EmpleadoID) {
      // Actualizar empleado
      this.empleadosService.actualizarEmpleado(empleadoParaGuardar).subscribe({
        next: () => {
          const index = this.empleados.findIndex(e => e.EmpleadoID === this.currentEmpleado.EmpleadoID);
          if (index !== -1) {
            this.empleados[index] = { ...empleadoParaGuardar };
          }
          console.log('Empleado actualizado:', empleadoParaGuardar);
          this.cargarEmpleado(); // Actualiza la lista de empleados
          this.cerrarPopup();
        },
        error: (err) => console.error('Error al actualizar el empleado:', err),
      });
    } else {
      // Agregar empleado
      this.empleadosService.agregarEmpleado(empleadoParaGuardar).subscribe({
        next: (respuesta) => {
          console.log('Empleado agregado:', respuesta);
          this.cargarEmpleado(); // Actualiza la lista de empleados
          this.cerrarPopup();
        },
        error: (err) => console.error('Error al agregar el empleado:', err),
      });
    }
  }
  
  
  get tituloPopup(): string {
    return this.currentEmpleado?.EmpleadoID ? 'Actualizar Empleado' : 'Agregar Empleado';
  }
  

  abrirPopup(empleado: any): void {
    if (!empleado) {
      console.error('No se ha seleccionado un empleado para editar.');
      return;
    }
    this.empleadosService.cargarEmpleado(empleado.EmpleadoID).subscribe({
      next: (data: any) => {
        this.currentEmpleado = data;
        this.isPopupVisible = true;
      },
      error: (err) => console.error('Error al cargar los datos de la empresa:', err)
    });
  }
 
  eliminarEmpleado(empleadoID: number): void {
    if (confirm('¿Está seguro de que desea eliminar este empleado?')) {
      this.empleadosService.eliminarEmpleado(empleadoID).subscribe({
        next: (response) => {
          alert(response?.Mensaje || 'Empresa eliminada correctamente');
          this.cargarEmpleado(); // Recarga las empresas después de la eliminación
        },
        error: (error) => {
          alert('Error al eliminar la empleado');
          console.error(error);
        }
      });
    }
  }

  onEliminarClick(): void {
    const selectedRowKeys = this.dataGrid.instance.getSelectedRowKeys();
    if (selectedRowKeys.length > 0) {
      const empleadoID = selectedRowKeys[0].EmpleadoID;
      this.eliminarEmpleado(empleadoID);
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
      { header: 'ID', dataKey: 'EmpleadoID' },
      { header: 'Nombre', dataKey: 'Nombre' },
      { header: 'Correo', dataKey: 'Email' },
      { header: 'Puesto', dataKey: 'Puesto' },
      { header: 'Teléfono', dataKey: 'Telefono' },
      { header: 'Fecha de Ingreso', dataKey: 'FechaIngreso' },
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
    const currentUser = sessionStorage.getItem('nombre') || 'Invitado'; // Usuario actual desde sessionStorage
    const exportDate = this.getCurrentDate(); // Fecha actual
    doc.text(`Usuario: ${currentUser}`, 6, 290);
    doc.text(`Fecha exportación: ${exportDate}`, 146, 290);

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

    // Subtítulo con el nombre del usuario logueado y la fecha actual
    const usuarioNombre = sessionStorage.getItem('nombre') || 'Usuario desconocido';
    const currentDate = this.getCurrentDate();
    const subtitleRow = worksheet.addRow([`Usuario: ${usuarioNombre}`, "", `Fecha exportación: ${currentDate}`]);    subtitleRow.alignment = { horizontal: 'left' };
    subtitleRow.alignment = { horizontal: 'left' };

    // Espacio entre títulos y encabezado
    worksheet.addRow([]);

      // Encabezados
    const headers = ['ID', 'Nombre', 'Correo', 'Puesto', 'Teléfono', 'Fecha de Ingreso'];
    
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
    const row = worksheet.addRow([emp.EmpleadoID, emp.Nombre, emp.Email, emp.Puesto, emp.Telefono, emp.FechaIngreso]);
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










