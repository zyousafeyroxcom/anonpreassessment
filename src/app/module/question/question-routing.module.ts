import { QuestionComponent } from './question/question.component';
import { BuilderComponent } from './builder/builder.component';
import { AnswerComponent } from './answer/answer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Links } from './config/links';
const routes: Routes = [
  {
    path: '', 
    component: QuestionComponent, 
    children: [
      {path: Links.answer.name, component: AnswerComponent},
      {path: Links.builder.name , component: BuilderComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuestionRoutingModule { }
export const routingComponent = [AnswerComponent, BuilderComponent, QuestionComponent]