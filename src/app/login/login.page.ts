import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, NavController, PopoverController} from '@ionic/angular';
import { UserService } from '../Services/user.service';
import { AlertService } from '../Services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  loginForm: FormGroup;

  constructor(private popoverCtrl: PopoverController, private navCtrl: NavController, private userService: UserService,
              private alertService: AlertService, public loadingController: LoadingController) {
                this.loginForm = this.createFormGroup();
              }

  get nombre() { return this.loginForm.get('nombre'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit() {}

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }


  async login(){
    this.presentLoading();
      const valid = await this.userService.login(this.loginForm.value.nombre, this.loginForm.value.password);
      if(valid){
        await this.loadingController.dismiss();
        this.navCtrl.navigateRoot('/', { animated: true});
      }else{
        this.loadingController.dismiss();
        const message = 'Usuario y/o Contraseña son incorrectos';
        this.alertService.presentToast(message, 'danger', 2500);
        this.loginForm.reset();
      }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

}
