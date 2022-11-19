import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {

  public student: Student;
  private students: Student[]; 

  constructor(
    private studentService:StudentService,
    private aroute: ActivatedRoute,
    private router: Router) { }

  //Este es para que se ejecute en cuanto se abre la pagina
  //Se ejecuta depues del constructor
  ngOnInit() {
    this.aroute.queryParams.subscribe(
      (params)=>{
        console.log(params);
        this.student = this.studentService.getStudentByControlNumber(params.controlnumber);
      }
      
    );
    
//params.controlnumber
  }

  /*public newStudent(student:Student):void{
    this.students.push(student); 
   }*/
   
   public newStudent(student:Student):void{
    
    this.studentService.newStudent(this.student);
    this.students = this.studentService.getStudents();
    //this.students.push(student); 
   }

   public removeStudent(pos: number): Student[]{
    this.students.splice(pos, 1);
    return this.students;
  }

  public updateStudent(student:Student){
    this.newStudent(student);
  }

  public editStudent(cn: string): void {
    //console.log(this.studentService.getStudentByControlNumber(cn));
    this.router.navigate(['edit-student'], {
      queryParams: { cn: cn },
    });
  }

}
 