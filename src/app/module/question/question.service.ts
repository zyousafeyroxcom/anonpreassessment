import { BehaviorSubject } from 'rxjs';


export class QuestionService {

  questions = new BehaviorSubject({})
  $questions = this.questions.asObservable();
  
  constructor() { }
}
