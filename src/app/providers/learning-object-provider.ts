import { Injectable } from '@angular/core';
import { LearningObject } from '../interfaces/learning-interface';
import { StorageService } from '../services/storage.service';

@Injectable()
export class LearningObjectProvider {

    learningObject;

    constructor(private storage: StorageService){
    
    }

    setBlankLearningObjects(){
        this.learningObject = {
            name:'',
            levels:[],
            published:false,
        };
    }

    setLearningObject(learningObject: LearningObject){
        this.learningObject = learningObject;
    }

    getLearningData(){
        return this.storage.getLearningObjects();
    }

    getName(){
        return this.learningObject.name;
    }

    getLevels(){
        return this.learningObject.name;
    }
    
    getPublished(){
        return this.learningObject.name;
    }

    getLearningObject(){
        return this.learningObject;
    }

    updateLearningObject(name:string, levels:string[], published:boolean){

        this.learningObject.name = name;
        this.learningObject.levels = levels;
        this.learningObject.published = published;
        
        if(this.learningObject.$key){
            this.storage.update(this.learningObject);
        }else{
            this.storage.save(this.learningObject);
        }
    }

    remove(learning: LearningObject){
        this.storage.remove(learning);
    }
}
