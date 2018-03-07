import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LearningObject } from '../interfaces/learning-interface';

@Injectable()
export class StorageService {

  items: AngularFireList<any>; 

  constructor(private db: AngularFireDatabase) { }

  //Gets all the learning objects from the database
  getLearningObjects(){
    this.items = this.db.list('/learning-objects');
    
    //this pulls the $keys from the wrapper classes of the objects
    //which allows $keys can be selected to remove and update data.
    return this.items.snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  };

  save(learning: LearningObject){
    this.items.push(learning);
  };

  update(learning: LearningObject){
    //The key must be delested from the learning object to successfuly update the data
    //although, the key must be stored so it can be used in the update function.
    let key = learning.$key;
    delete learning.$key;
    this.items.update(key,learning);
  };


  remove(learning: LearningObject){
    //The if statment prevents from the whole database being deleted if a key isnt present
    if(learning.$key){
      this.items.remove(learning.$key);
    }
  };
}
