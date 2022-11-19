import { Injectable } from '@angular/core';

//importar clase que creamos como base
import {Student} from "../models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  //arreglo de estudiantes
  private students: Student[]; 
 
  constructor() { 
    this.students = [
      {
      controlnumber: "02400391", 
      age: 38,
      career: "ISC",
      curp: "A0VIDJ2KDLSSD",
      email: "iarjona2@ittepic.edu.mx",
      name: "Israel Arjona Vizcaíno",
      nip: 717,
      photo:"https://picsum.photos/600/?random=1"
      },
      { 
        controlnumber: "18401175", 
        age: 22,
        career: "ISC",
        curp: "JC22DJ2KDLSSD",
        email: "heleperezcr@ittepic.edu.mx",
        name: "Hector Leopoldo Perez Cruz",
        nip: 727,
        photo:"https://picsum.photos/600/?random=1"
        },
        {
          controlnumber: "18401160", 
          age: 22,
          career: "ISC",
          curp: "JCÑL0O2KDLSSD",
          email: "joluperezlo@ittepic.edu.mx",
          name: "Jose Luis Perez Lopez",
          nip: 700,
          photo:"https://picsum.photos/600/?random=1"
          }
    ]
   }

   //Consulta
   public getStudents(): Student[]{
    return this.students;
   }

   //Metodo obtener estudiante por numero de control
   public getStudentByControlNumber(cn: string): Student{
    let item : Student;
    item = this.students.find(
      (student)=> {
        return student.controlnumber==cn;
      }
    );
    return item;
   }
   //-----------------------------------------------
   //
   public newStudent(student:Student):void{
    this.students.push(student); 
   }
   
   public removeStudent(pos: number): Student[]{
    this.students.splice(pos, 1);
    return this.students;
  }

  public editStudent(st:Student){
    this.students.find((student)=>{
      if(student.controlnumber===st.controlnumber)
        student=st
    });
  }
  
 
} 
