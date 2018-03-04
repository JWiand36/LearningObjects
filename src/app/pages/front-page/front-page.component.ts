import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LearningObjectProvider } from '../../providers/learning-object-provider';
import { LearningObject } from '../../interfaces/learning-interface';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  display = true;
  items: Observable<any>;

  constructor(private provider: LearningObjectProvider) { }

  ngOnInit() {
    this.items = this.provider.getLearningData();
  }

  displayPublished(){
    if(this.display){
      this.display = false;
    }else{
      this.display = true;
    }
  }

  update(learning: LearningObject){
    
    let strings = [
      'one',
      'two',
      'three',
    ];
    
    this.provider.setLearningObject(learning);
    this.provider.updateLearningObject('Changed Name', strings, true);
  };
    
  save(){
    this.provider.setBlankLearningObjects();
    
    let strings = [
      'one',
      'two',
      'three',
    ];
    
    this.provider.updateLearningObject('new test', strings, false);
  }


  remove(learning: LearningObject){
    this.provider.remove(learning);
  }
}
