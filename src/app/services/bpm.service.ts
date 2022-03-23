import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

const checListUrl = environment.checkListUrl;
const agregarFoto = environment.agregarFoto;
const agregarFirma = environment.agregarFirma;
const utilUrl = environment.utilUrl;

@Injectable({
  providedIn: 'root'
})
export class BPMService {

  datosUsuario;

  constructor( private http: HttpClient, private storage: Storage ) {}

  async getListas<T>(){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}${checListUrl}listas&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${checListUrl}listas&usuario=${this.datosUsuario.codigo}`);
  }

  async getPreguntas<T>(revision, lista){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}${checListUrl}preguntas&revision=${revision}&lista=${lista}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${checListUrl}preguntas&revision=${revision}&lista=${lista}`);
  }

  async openTask<T>(lista, programacion, fecha, hora){
    this.datosUsuario = await this.storage.get('datos');
    // eslint-disable-next-line max-len
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${checListUrl}new_revision&lista=${lista}&programacion=${programacion}&usuario=${this.datosUsuario.codigo}&fecha=${fecha}&hora=${hora}`);
  }

  async responder<T>(revision, lista, pregunta, respuesta){
    this.datosUsuario = await this.storage.get('datos');
    // eslint-disable-next-line max-len
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${checListUrl}responder&revision=${revision}&lista=${lista}&pregunta=${pregunta}&respuesta=${respuesta}`);
  }

  async cerrarRevision<T>(revision, observaciones, fecha, hora){
    this.datosUsuario = await this.storage.get('datos');
    // eslint-disable-next-line max-len
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${checListUrl}cerrar&revision=${revision}&observaciones=${observaciones}&fecha=${fecha}&hora=${hora}`);
  }

  async addSign<T>(file,  revision){
    const fd = new FormData();
    fd.append('image', file);
    this.datosUsuario = await this.storage.get('datos');
    return this.http.post<T>(`https://${this.datosUsuario.dominio}${agregarFirma}&revision=${revision}`, fd);
  }

}
