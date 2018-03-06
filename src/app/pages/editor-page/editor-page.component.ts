import { Component, OnInit } from '@angular/core';
import { LearningObjectProvider } from '../../providers/learning-object-provider';
import { LearningObject } from '../../interfaces/learning-interface';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.css']
})
export class EditorPageComponent implements OnInit {

  form: FormGroup;

  constructor(private provider: LearningObjectProvider, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.maxLength(50)),
      k12: new FormControl(''),
      undergrad: new FormControl(''),
      grad: new FormControl(''),
      publish: new FormControl(''),

    })
  }

  update(){
    let name = this.form.controls['name'].value;
    let published = this.form.controls['publish'].value;
    let level: string[] = [];
    let index = 0;

    if(published === 'True'){
      published = true;
    }else{
      published = false;
    }

    if(this.form.controls['k12'].value){
      level[index] = 'K-12';
      index++;
    }if(this.form.controls['undergrad'].value){
      level[index] = 'Undergraduate';
      index++
    }if(this.form.controls['grad'].value){
      level[index] = 'Graduate';
    }

    if(name === ''){
      name = this.provider.getName();
    }
    
    this.provider.updateLearningObject(name, level, published);
    this.router.navigate(['']);
  };
}
