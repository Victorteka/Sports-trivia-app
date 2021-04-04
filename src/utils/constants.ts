export const BASE_URL = 'https://opentdb.com/api.php?amount=10&category=21&type=multiple'

export const TOTAL_QUESTIONS = 10

//Shuffle array function
export const shuffleArray = (array: any[]) => [...array].sort(()=>Math.random() - 0.5)