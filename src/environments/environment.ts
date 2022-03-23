// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl: 'https://login.bpm.gt/API/API_login.php?request=',
  ayudaUrl: '/ROOT/API/API_ayuda.php?request=',
  utilUrl: '/ROOT/API/API_util.php?request=',
  ajustesUrl: '/ROOT/API/API_ajustes.php?request=',
  checkListUrl: '/ROOT/API/API_checklist.php?request=',
  fotoPerfil: '/ROOT/API/API_foto_perfil.php',
  agregarFoto: '/ROOT/API/API_checklist_foto.php',
  agregarFirma: '/ROOT/API/API_cheklist_firma.php'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
