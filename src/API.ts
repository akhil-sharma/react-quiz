import { shuffleArray} from './utils';

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    question: string;
    type: string;
    incorrect_answers:string[]; 
};

export type QuestionState = Question & { answer: string[] };

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
};

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`;
    const data = await ( await fetch(endPoint)).json();
    return data.results.map((question: QuestionState) => (
        {
            ...question,
            answer: shuffleArray([
                ...question.incorrect_answers, 
                question.correct_answer
            ])
        }
    ))
}