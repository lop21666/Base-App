import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { ModalController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfilData: any;
  urlFoto: any;
  mostrarData = false;
  profileForm: FormGroup;
  items = Array(3);
  myImage = null;
  datosUsuario;
  // eslint-disable-next-line max-len
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor( private userService: UserService, private alertService: AlertService,
              private navCtrl: NavController, private loadingController: LoadingController, private storage: Storage) {
    this.profileForm = this.createFormGroup();
  }

  get nombre() { return this.profileForm.get('nombre'); }
  get mail() { return this.profileForm.get('mail'); }
  get telefono() { return this.profileForm.get('telefono'); }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.getData();
    this.datosUsuario = await this.storage.get('datos');
  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      telefono: new FormControl('', [Validators.required])
    });
  }

  defaultValue( perfilData ){
    this.profileForm.controls.nombre.setValue(perfilData.nombre);
    this.profileForm.controls.mail.setValue(perfilData.mail);
    this.profileForm.controls.telefono.setValue(perfilData.telefono);
  }


  async getData() {
    (await this.userService.getPerfil()).subscribe(async (resp: any) =>{
      if (resp.status){
        this.perfilData = resp.data;
        this.defaultValue( this.perfilData );
        this.urlFoto = await this.datosUsuario.url_foto;
        this.mostrarData = true;
      }else{
        this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde.');
      }
    });

  }

  clean(){
    this.profileForm.reset();
  }

  async editProfile(){
    this.presentLoading();
    await (await this.userService.editProfile(this.profileForm.value.nombre, this.profileForm.value.mail, this.profileForm.value.telefono)).
    subscribe((resp: any) =>{
      if(resp.status){
        this.mostrarData = false;
        this.alertService.presentToast('Registro actualizado!', 'success', 3000);
        this.getData();
        this.loadingController.dismiss();
      }else{
        this.alertService.presentToast('Ha ocurrido un error, intenta más tarde', 'danger', 3000);
        this.loadingController.dismiss();
      }
    });
  }

  back(){
    this.navCtrl.back({animated: true});
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

}
