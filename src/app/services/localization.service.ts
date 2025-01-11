import { Injectable } from '@angular/core';
// import Globalize from 'globalize';
// import esMessages from 'devextreme/localization/messages/es.json';
// import enMessages from 'devextreme/localization/messages/en.json';
// import supplementalCldrData from 'npm:devextreme-cldr-data/supplemental.json!json';
// import enCldrData from 'devextreme-cldr-data/en.json';
// import esCldrData from 'devextreme-cldr-data/es.json';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  // private currentLocale: string = 'en';

  // constructor() {
  //   this.initGlobalize();
  //   this.setLocale(this.getLocale());
  // }

  // initGlobalize() {
  //   Globalize.load(enCldrData, esCldrData, supplementalCldrData);
  //   Globalize.loadMessages(enMessages);
  //   Globalize.loadMessages(esMessages);
  //   Globalize.loadMessages(this.getCustomDictionary());
  // }

  // getCustomDictionary() {
  //   return {
  //     en: {
  //       Welcome: 'Welcome to the system',
  //       Home: 'Home',
  //       Employees: 'Employees',
  //       Companies: 'Companies',
  //       UserProfile: 'User Profile',
  //       Update: 'Update',
  //       Close: 'Close',
  //     },
  //     es: {
  //       Welcome: 'Bienvenido al sistema',
  //       Home: 'Inicio',
  //       Employees: 'Empleados',
  //       Companies: 'Empresas',
  //       UserProfile: 'Perfil de Usuario',
  //       Update: 'Actualizar',
  //       Close: 'Cerrar',
  //     },
  //   };
  // }

  // setLocale(locale: string) {
  //   this.currentLocale = locale;
  //   Globalize.locale(locale);
  //   sessionStorage.setItem('locale', locale);
  // }

  // getLocale(): string {
  //   return sessionStorage.getItem('locale') || 'en';
  // }

  // translate(key: string): string {
  //   return Globalize.formatMessage(key);
  // }
}
