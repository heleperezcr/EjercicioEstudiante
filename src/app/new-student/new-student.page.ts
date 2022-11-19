import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {

  public student: Student;  
  public myForm:FormGroup;
  public validationMessages: Object;

  constructor(
    private studentService: StudentService, 
    private fb: FormBuilder
    ) { }

  //Se ejecuta cuando todo el HTML ya esta cargado
  ngOnInit() {
    this.myForm = this.fb.group(
      {
        //valor inicial, validaciones
        controlnumber: ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')])],
        age: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('^[0-9]+$'),  Validators.min(18)])],
        carreer: ["", Validators.compose([Validators.required, Validators.pattern('')])],
        curp: ["", Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('^[a-zÑñA-Z]+[a-zÑñA-Z0-9]*$')])],
        email: ["", Validators.compose([Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)])],
        name: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zÑñA-Z]+[a-zÑñA-Z ]*$')])],
        nip: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(4), Validators.pattern('[1-9][0-9]+')])],
        photo: ["", Validators.compose([Validators.required, Validators.pattern(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]))?(?:\?([^#]))?(?:#(.*))?$/)])]
      }
    );

    this.validationMessages = {
      controlnumber: [
        { type: 'required', message: "Número de control requerido" },
        { type: 'minlength', message: "Debe ser de 8 dígitos" },
        { type: 'maxlength', message: "Debe ser de 8 dígitos" },
        { type: 'pattern', message: "EL formato no corresponde" }
      ],
      age: [
        { type: 'required', message: "Ingrese su edad" },
        { type: 'minlength', message: "La edad debe de ser de 2 digitos" },
        { type: 'maxlength', message: "La edad debe de ser de 2 digitos" },
        { type: 'pattern', message: "El formato no corresponde" },
        { type: 'min', message: "Edad mínima 18" },
      ],
      carreer: [
        { type: 'required', message: "Campo obligatorio" }
      ]
      ,
      curp: [
        { type: 'required', message: "Campo obligatorio" },
        { type: 'minlength', message: "La curp debe contener 18 dígitos" },
        { type: 'maxlength', message: "La curp debe contener 18 dígitos" },
        { type: 'pattern', message: "Formato no vlido" }
      ]
      ,
      email: [
        { type: 'required', message: "Campo obligatorio" },
        { type: 'pattern', message: "Formato no valido" }
      ]
      ,
      name: [
        { type: 'required', message: "Campo obligatorio" },
        { type: 'pattern', message: "Formato no valido" }
      ]
      ,
      nip: [
        { type: 'required', message: "Campo obligatorio" },
        { type: 'minlength', message: "Debe contener al menos 2 dígitos" },
        { type: 'maxlength', message: "Debe contener máximo 4 dígitos" },
        { type: 'pattern', message: "Formato no valido" }
      ]
      ,
      photo: [
        { type: 'required', message: "Enlace de foto obligatorio" },
        { type: 'pattern', message: "EL enlace de la foto no es valido" }
      ]
    }

  }

  public newStudent():void{
    //Construir el objeto
    this.studentService.newStudent(this.student);
  }

}
