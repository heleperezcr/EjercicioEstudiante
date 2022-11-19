import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit {

  public student: Student;
  public myForm : FormGroup;
  public validatorsMessages: Object;

  constructor(private studentService: StudentService, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private alertController: AlertController, private toastController: ToastController, private router: Router) { }

    ngOnInit() {
      this.activatedRoute.queryParams.subscribe((params)=>{
          const res = params.get
          console.log(params.cn+"Hola");
          this.student = this.studentService.getStudentByControlNumber(params.cn);
        }
      );
  
      this.myForm= this.fb.group(
        {
          carrera:["",Validators.compose([Validators.required])],
          controlnumber:["",Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(8), Validators.pattern('^[0-9]+$')])],
          name:["",Validators.compose([Validators.required])],
          curp:["",Validators.compose([Validators.required,Validators.pattern("^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$")])], //pattern
          age:["",Validators.compose([Validators.required,Validators.min(17),Validators.pattern('^[0-9]+')])],
          nip:["",Validators.compose([Validators.required,Validators.min(10),Validators.max(9999)])],
          email:["",Validators.compose([Validators.required,Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z0-9-]{2,}$")])], //pattern
          photo:["",Validators.compose([Validators.required,Validators.pattern(/https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*/)])]
        }
      );
      this.validatorsMessages = {
        'controlnumber':[
          {type: 'required',message:"Número de control obligatorio"},
          {type: 'minlength',message:"Número de control debe ser de 8 dígitos"},
          {type: 'maxlength',message:"Número de control debe ser de 8 dígitos"},
          {type: 'pattern',message:"Número de control mal formado"}
        ],
        'name':[
          {type: 'required',message:"Nombre obligatorio"}
        ],
        'curp':[
          {type: 'required',message:"CURP obligatorio"},
          {type: 'pattern',message:"CURP mal formado"} //PATTERN
        ],
        'age':[
          {type: 'required',message:"Edad obligatoria"},
          {type: 'min',message:"Debes tener 17 años o más"},
          {type: 'pattern',message:"Ingresa sólo dígitos"}
        ],
        'nip':[
          {type: 'required',message:"NIP obligatorio"},
          {type: 'min',message:"Tu NIP debe tener mínimo 2 digitos"},
          {type: 'max',message:"Tu NIP debe tener máximo 4 digitos"}
        ],
        'email':[
          {type: 'required',message:"Email obligatorio"}, //PATTERN
          {type: 'pattern',message:"Email mal formado"}
        ],
        'photo':[
          {type: 'required',message:"Foto obligatoria"}, //PATTERN
          {type: 'pattern',message:"URL de foto mal formado"}
        ]
  
      }
    }
    async presentAlertError() {
      const alert = await this.alertController.create({
        header: 'Alerta',
        subHeader: 'Aviso: ',
        message: 'NO se guardo, ingrese todos los campos!',
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  
      async presentToast(position: 'top' | 'middle' | 'bottom') {
      const toast = await this.toastController.create({
        message: 'GUARDADO CORRECTAMENTE!',
        duration: 1500,
        position,
        color:'success'
      });
  
      await toast.present();
    }/*
    public newStudent(){
      if(this.myForm.get('name').value!==''){
        this.student = {
  
          controlnumber: this.myForm.get('controlnumber').value,
          name: this.myForm.get('name').value,
          curp: this.myForm.get('curp').value,
          age: this.myForm.get('age').value,
          nip: this.myForm.get('nip').value,
          email: this.myForm.get('email').value,
          career: this.myForm.get('carrera').value,
          photo: this.myForm.get('photo').value,
        
        }  
        this.studentService.editStudent(1, this.student);
                //this.presentAlert();
          this.presentToast("top")
          console.log(this.student);
        }else{
          console.log(this.student);
          this.presentAlertError()
        }
      }*/
  
      public editStudent(){
        this.student={
          controlnumber: this.myForm.value.controlnumber,
          age: this.myForm.value.age,
          career: this.myForm.value.career,
          curp: this.myForm.value.curp,
          email: this.myForm.value.email,
          name: this.myForm.value.name,
          nip: this.myForm.value.nip,
          photo: this.myForm.value.photo
        }
    
        this.studentService.editStudent(this.student);
        this.router.navigate(['/home'], {
        });
      }
   
  
  
  }
