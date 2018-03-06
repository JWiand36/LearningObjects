import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StorageService } from './services/storage.service'; 
import { LearningObjectProvider } from './providers/learning-object-provider';
import { environment } from '../environments/environment';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    EditorPageComponent
  ],

  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'learningstorage'),
    AngularFireDatabaseModule,
    routing,
    ReactiveFormsModule,
  ],

  providers: [
    StorageService,
    LearningObjectProvider,
  ],
  bootstrap: [AppComponent],

})

export class AppModule { }
