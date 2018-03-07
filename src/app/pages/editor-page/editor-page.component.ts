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

  constructor(public provider: LearningObjectProvider, private router: Router) { }

  ngOnInit() {
    //TODO: reduce the amount of formControls needed for the checkboxes
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

    //Converts the string vales from the Radiobuttons into boolean values
    if(published === 'True'){
      published = true;
    }else{
      published = false;
    }


    //If a check box is checked, the correct value will be 
    //entered in the level array.
    if(this.form.controls['k12'].value){
      level[index] = 'K-12';
      index++;
    }if(this.form.controls['undergrad'].value){
      level[index] = 'Undergraduate';
      index++
    }if(this.form.controls['grad'].value){
      level[index] = 'Graduate';
    }

    /*
      If the name is left blank in the textbox then the provider prevents
      the name from being erased. TODO: Refactor this without needing the 
      provider.
    */
    if(name === ''){
      name = this.provider.getName();
    }
    
    this.provider.updateLearningObject(name, level, published);
    this.router.navigate(['']);
  };
}
