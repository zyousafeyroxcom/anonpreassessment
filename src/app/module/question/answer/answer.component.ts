import { QuestionService } from './../question.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Lables } from '../config/labels';
import { Links } from '../config/links';
import { QuestionTypes } from '../config/enums';
import { Subscription } from 'rxjs';
import { Questions } from '../model/question.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit, OnDestroy {

  questions: Questions[] = [];
  lables = Lables;
  links = Links;
  questionTypes = QuestionTypes;
  obs: any;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.obs = this.questionService.$questions.subscribe(
      (data: any) => {
      this.questions = data.questions;
    },
    error => {
      // add error logic
    }
    );
  }


  ngOnDestroy() {
    this.obs.unsubscribe();
  }

}

