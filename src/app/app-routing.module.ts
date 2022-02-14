import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'question', 
    loadChildren: () => import('./module/question/question.module').then(m => m.QuestionModule)
  },
  {
    path: '',
    redirectTo: 'question/builder',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
