// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class ConfigService {
//   private config: any;

//   constructor(private http: HttpClient) {}

//   // Load configuration from config.json
//   loadConfig(): Promise<void> {
//     return this.http
//       .get('/assets/config.json')
//       .toPromise()
//       .then((config) => {
//         this.config = config;
//       });
//   }

//   // Get specific configuration value
//   get(key: string): any {
//     return this.config ? this.config[key] : null;
//   }
// }
