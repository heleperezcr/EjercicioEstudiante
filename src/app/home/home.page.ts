import { Component } from '@angular/core';
import { Student } from "../models/student";
import {StudentService} from "../services/student.service";
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Student[];

  constructor(
    private studentServices: StudentService,
    private router: Router,
    private alertcntroller: AlertController
    ) {
    this.students = this.studentServices.getStudents();
  }

  public async removeStudent(pos: number) {
    const alert = await this.alertcntroller.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.students = this.studentServices.removeStudent(pos);
          }
        }
      ]
    });

    await alert.present();


  }

  //---------------
  public getStudentByControlNumber(cn: string): void{
    this.router.navigate(
      ['/view-student'],
      {
        queryParams: {controlnumber: cn}
      }
      );
  }
  //----------------



}
