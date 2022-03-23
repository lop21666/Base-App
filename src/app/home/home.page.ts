import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BPMService } from '../services/bpm.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  listas;
  cardSkeleton = true;
  noData = false;
  skeletonScreen = Array(4);

  constructor( private navController: NavController, private storage: Storage, private bpmService: BPMService,
                private alertService: AlertService, private modalController: ModalController,
                public loadingController: LoadingController) {}

  ngOnInit() {
    this.getListas();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async getListas<T>(){
      (await this.bpmService.getListas()).subscribe((resp: any) =>{
        if(resp.status){
          this.listas = resp.data;
          console.log(resp);
          setTimeout(() => {
            this.cardSkeleton = false;
          }, 500);
          if (this.listas === null || this.listas.length === 0){
            this.noData = true;
          }else{
            this.noData = false;
          }
        }else{
          this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde.');
        }
      });
    }

  async logOut(){
    this.navController.navigateRoot('/login');
    this.storage.clear();
  }

  getDate(){
    let todayDate;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    todayDate = dd + '/' + mm + '/' + yyyy;
    return todayDate;
  }

  getHour(){
    const hoy = new Date();
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    return hora;
  }

  /*
  async abrirLista<T>( lista ){
    this.presentLoading();
    (await this.bpmService.openTask(lista.codigo_lista, lista.codigo_programacion, this.getDate(), this.getHour()))
    .subscribe(async (resp: any) =>{
      console.log(resp);
      if(resp.status){

        const revision = resp.data[0].revison;

        const modal = await this.modalController.create({
          component: ,
          backdropDismiss: false,
          componentProps: { lista,
                            revision}
        });
        await modal.present();

        const value: any = await modal.onDidDismiss();
        if(value.data === true){
          this.cardSkeleton = true;
          this.noData = false;
          this.getListas();
        }
      }else{
        this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde');
      }
    });
  }*/

}
