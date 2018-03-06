import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LearningObjectProvider } from '../../providers/learning-object-provider';
import { LearningObject } from '../../interfaces/learning-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  display = true;
  items: Observable<any>;

  constructor(private provider: LearningObjectProvider,
    private router: Router) { }

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

  remove(learning: LearningObject){
    this.provider.remove(learning);
  }

  editLearningObject(learning: LearningObject){
    this.provider.setLearningObject(learning);
    this.router.navigate(['editor']);
  }

  createLearningObject(){
    this.provider.setBlankLearningObjects();
    this.router.navigate(['editor']);
  }

  sort(){
    this.items = this.items.map(items =>{
      items.sort((item1,item2) =>{
        if(item1.name < item2.name)
          return -1;
        else 
          return 1;
      });
      return items;
    })
  }
}
