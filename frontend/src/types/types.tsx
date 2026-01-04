export type SelectedCategoryType = { [key: string]: boolean };

export type CategoryObj = {
  category: string;
  occurences: number;
};

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  category: string;
  knownCount: number;
};
