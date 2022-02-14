import { QuestionTypes } from "../config/enums";

export type Questions = {
    question: string,
    type  : QuestionTypes.paragraph | QuestionTypes.checkbox
    answers : Answer[] 
};
export type Answer = {
    answerText: string, answerValue: boolean
}