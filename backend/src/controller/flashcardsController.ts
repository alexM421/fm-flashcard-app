import { Request, Response } from "express";
import { supabase } from "../lib/supabase";

// Define the Flashcard type
type Flashcard = {
  id: string;
  question: string;
  answer: string;
  category: string;
  knownCount: number;
};

export const getFlashcards = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("flashcards")
      .select('app_id, question, answer, category, known_count');

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch flashcards',
        message: error.message 
      });
    }

    const flashcards: Flashcard[] = (data || []).map(flashcard => ({
        id: flashcard.app_id,
        question: flashcard.question,
        answer: flashcard.answer,
        category: flashcard.category,
        knownCount: flashcard.known_count
    }))

    res.status(200).json({ flashcards });

  } catch (err) {
    console.error('Unexpected error in getFlashcards:', err);
    
    // Type-safe error handling
    const errorMessage = err instanceof Error 
      ? err.message 
      : 'An unknown error occurred';
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: errorMessage 
    });
  }
}