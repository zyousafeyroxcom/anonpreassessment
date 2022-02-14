import { QuestionService } from './../question.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { QuestionDialogComponent } from './../question-dialog/question-dialog.component';
import { Lables } from '../config/labels';
import { Links } from '../config/links';
import { QuestionTypes } from '../config/enums';
import { Answer, Questions } from '../model/question.model';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit, OnDestroy {

  questionsForm: FormGroup;
  isData: boolean= false;
  lables = Lables;
  links = Links;
  questionTypes = QuestionTypes;
  obs: any;
  
  constructor(private fb: FormBuilder, private dialog: MatDialog, private questionService: QuestionService) { 
    this.questionsForm = this.fb.group({
      questions: this.fb.array([])
    })
  }

  ngOnInit(): void {
  

   this.obs = this.questionsForm.valueChanges
    .pipe( 
      debounceTime(100),
      distinctUntilChanged()
    )
    .subscribe((data: any) => {
      if(data) {
        this.questionService.questions.next(data);
      }
    });
  }

  newQuestion(data: Questions): FormGroup {
    const fg = this.fb.group({
      type: new FormControl(data.type, [Validators.required]),
      question: new FormControl(data.question, [Validators.required]),
      answers: this.fb.array([])
    });

    const answers = fg.get('answers') as FormArray;
    data.answers.forEach((answer: Answer) => {
      answers.push(
        this.fb.group(
          { answerValue: new FormControl(answer.answerValue), answerText: new FormControl(answer.answerText) }
        )
      )
    });

    return fg;
  }

  get questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  } 

  getAnswers(form: any) {
    return form.controls.answers.controls;
  }

  getAnswer(form: any) {
    return form.controls
  }

  openDialog() {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      height: '400px',
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.isData = true
        const form = this.questionsForm.get('questions') as FormArray;
        form.push(this.newQuestion(result));
      }
    });
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }

}
