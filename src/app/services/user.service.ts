import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';


const loginUrl = environment.loginUrl;
const ayudaUrl = environment.ayudaUrl;
const ajustesUrl = environment.ajustesUrl;
const fotoPerfil = environment.fotoPerfil;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data: object = null;
  datosUsuario;

  constructor( private http: HttpClient, private storage: Storage) {}

  login<T>( usu, password){
    return new Promise (resolve => {
      this.http.get(`${loginUrl}login&usu=${usu}&pass=${password}`).subscribe((resp: any) => {
        console.log(`${loginUrl}login&usu=${usu}&pass=${password}`);
        if ( resp.status ){
          this.datosLocalStorage( resp.data );
          resolve(true);
        }else{
          this.data = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async datosLocalStorage( data: object){
    this.storage.create();
    this.data = data;
    await this.storage.set('datos', data);
  }

  async contactAdmin<T>(nombre, mail, subject, msj){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}${ayudaUrl}contact&nombre=${nombre}
                            &mail=${mail}&subject=${subject}&msj=${msj}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ayudaUrl}contact&nombre=${nombre}
                            &mail=${mail}&subject=${subject}&msj=${msj}`);
  }

  async resetPassword<T>(mail){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}${ayudaUrl}password&mail=${mail}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ayudaUrl}password&mail=${mail}`);
  }

  async getPerfil<T>(){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}${ajustesUrl}get_perfil&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ajustesUrl}get_perfil&usuario=${this.datosUsuario.codigo}`);
  }

  async getFoto<T>(){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}${ajustesUrl}get_foto&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ajustesUrl}get_foto&usuario=${this.datosUsuario.codigo}`);
  }

  async editProfile<T>( nombre, mail, telefono){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}${ajustesUrl}set_perfil&usuario=${this.datosUsuario.codigo}
                &nombre=${nombre}&mail=${mail}&telefono=${telefono}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ajustesUrl}set_perfil&usuario=${this.datosUsuario.codigo}
                            &nombre=${nombre}&mail=${mail}&telefono=${telefono}`);
  }

  async getPassword<T>(){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}${ajustesUrl}get_pasword&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ajustesUrl}get_pasword&usuario=${this.datosUsuario.codigo}`);
  }

  async setPassword<T>( usu, password){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}${ajustesUrl}set_pasword
    &usuario=${this.datosUsuario.codigo}&usu=${usu}&pass=${password}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ajustesUrl}set_pasword
    &usuario=${this.datosUsuario.codigo}&usu=${usu}&pass=${password}`);
  }

  async changePhoto<T>(userData){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.post<T>(`https://${this.datosUsuario.dominio}${fotoPerfil}`, userData);
  }

}
