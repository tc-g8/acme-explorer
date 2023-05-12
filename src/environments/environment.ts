// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendApiBaseURL: 'https://acme-explorer-backend.onrender.com',
  firebaseConfig: {
    apiKey: 'AIzaSyB4KZiJ04_eH_nAQadct84F-h8zQYuZ8J8',
    authDomain: 'acme-explorer-g8.firebaseapp.com',
    projectId: 'acme-explorer-g8',
    storageBucket: 'acme-explorer-g8.appspot.com',
    messagingSenderId: '408887835652',
    appId: '1:408887835652:web:70fd310011ddec774f4951',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
