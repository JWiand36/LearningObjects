import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';

const appRoutes: Routes = [
    {
        path: '',
        component: FrontPageComponent,
    },
    {
        path:'editor',
        component: EditorPageComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

