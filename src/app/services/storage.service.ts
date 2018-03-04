import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LearningObject } from '../interfaces/learning-interface';

@Injectable()
export class StorageService {

  items: AngularFireList<any>; 

  constructor(private db: AngularFireDatabase) { }

  getLearningObjects(){
    this.items = this.db.list('/learning-objects');
    
    return this.items.snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  };

  save(learning: LearningObject){
    this.items.push(learning);
  };

  update(learning: LearningObject){
    let key = learning.$key;
    delete learning.$key;
    this.items.update(key,learning);
  };

  remove(learning: LearningObject){
    if(learning.$key){
      this.items.remove(learning.$key);
    }
  };
}
