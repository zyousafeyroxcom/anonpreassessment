import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lables } from '../config/labels';
import { QuestionTypes } from '../config/enums';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent implements OnInit {

  questionForm: FormGroup;
  lables = Lables;
  questionTypes = QuestionTypes;


  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.questionForm = this.fb.group({
      type: new FormControl(null, [Validators.required]),
      question: new FormControl(null, [Validators.required]),
      answers: this.fb.array([
        this.fb.group({answerValue : new FormControl(null), answerText : new FormControl('')})
      ])
    })
  }

  ngOnInit(): void {
    console.log('dialog data', this.data)
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  } 

  newAnswer() {
    this.answers.push(this.fb.group({answerValue : new FormControl(null), answerText : new FormControl('')}));
  }

  closeDialog() {
    this.dialogRef.close(this.questionForm.value);
    this.questionForm.reset();
  }

}
