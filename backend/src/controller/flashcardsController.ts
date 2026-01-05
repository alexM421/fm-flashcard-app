import { Request, Response } from "express";
import { supabase } from "../lib/supabase";

// Define the Flashcard type
export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  category: string;
  knownCount: number;
};

// Database flashcard type (snake_case)
type DatabaseFlashcard = {
  app_id: string;
  question: string;
  answer: string;
  category: string;
  known_count: number;
};

// Helper function to map database format to API format
const mapFlashcardFromDB = (dbCard: DatabaseFlashcard): Flashcard => ({
  id: dbCard.app_id,
  question: dbCard.question,
  answer: dbCard.answer,
  category: dbCard.category,
  knownCount: dbCard.known_count,
});

export const getFlashcards = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("flashcards")
      .select("app_id, question, answer, category, known_count");

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to fetch flashcards",
        message: error.message,
      });
    }

    const flashcards: Flashcard[] = (data || []).map(mapFlashcardFromDB);

    res.status(200).json({ flashcards });
  } catch (err) {
    console.error("Unexpected error in getFlashcards:", err);

    // Type-safe error handling
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    res.status(500).json({
      error: "Internal server error",
      message: errorMessage,
    });
  }
};

export const createFlashcard = async (req: Request, res: Response) => {
  const { body } = req;

  // Validate required fields (id is optional - let DB generate if not provided)
  if (!body.question || !body.answer || !body.category) {
    return res.status(400).json({
      error: "Validation error",
      message:
        "Missing required fields: question, answer and category are required",
    });
  }

  try {
    // Only include app_id if provided (for custom IDs)
    const formattedFlashcard: any = {
      question: body.question,
      answer: body.answer,
      category: body.category,
      known_count: body.knownCount ?? 0,
    };

    // Include ID only if provided
    if (body.id) {
      formattedFlashcard.app_id = body.id;
    }

    const { data, error } = await supabase
      .from("flashcards")
      .insert(formattedFlashcard)
      .select("app_id, question, answer, category, known_count");

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to insert flashcard",
        message: error.message,
      });
    }

    // Check if data was returned
    if (!data || data.length === 0) {
      return res.status(500).json({
        error: "Failed to create flashcard",
        message: "No data returned from database",
      });
    }

    const flashcard = mapFlashcardFromDB(data[0]);

    // Consistent response format
    res.status(201).json({ flashcard });
  } catch (err) {
    console.error("Unexpected error in createFlashcard:", err);

    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    res.status(500).json({
      error: "Internal server error",
      message: errorMessage,
    });
  }
};

export const updateFlashcard = async (req: Request, res: Response) => {
  const { body, params } = req;
  const id = params.id;

  // Validate required fields (id comes from URL, not body)
  if (!body.question || !body.answer || !body.category) {
    return res.status(400).json({
      error: "Validation error",
      message:
        "Missing required fields: question, answer and category are required",
    });
  }

  try {
    const formattedFlashcard: {
      question: string;
      answer: string;
      category: string;
      known_count?: number;
    } = {
      question: body.question,
      answer: body.answer,
      category: body.category,
    };

    // Only include known_count if provided
    if (body.knownCount !== undefined) {
      formattedFlashcard.known_count = body.knownCount;
    }

    const { data, error } = await supabase
      .from("flashcards")
      .update(formattedFlashcard)
      .eq("app_id", id)
      .select("app_id, question, answer, category, known_count");

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to update flashcard",
        message: error.message,
      });
    }

    // Check if flashcard was found
    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Flashcard not found",
        message: `No flashcard found with id: ${id}`,
      });
    }

    const flashcard = mapFlashcardFromDB(data[0]);

    // Consistent response format
    res.status(200).json({ flashcard });
  } catch (err) {
    console.error("Unexpected error in updateFlashcard:", err);

    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    res.status(500).json({
      error: "Internal server error",
      message: errorMessage,
    });
  }
};

export const getFlashcardById = async (req: Request, res: Response) => {
  const { params } = req;
  const id = params.id;

  try {
    const { data, error } = await supabase
      .from("flashcards")
      .select("app_id, question, answer, category, known_count")
      .eq("app_id", id);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to fetch flashcard",
        message: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Flashcard not found",
        message: `No flashcard found with id: ${id}`,
      });
    }

    const flashcard = mapFlashcardFromDB(data[0]);

    res.status(200).json({ flashcard });
  } catch (err) {
    console.error("Unexpected error in getFlashcardById:", err);

    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    res.status(500).json({
      error: "Internal server error",
      message: errorMessage,
    });
  }
};

export const deleteFlashcard = async (req: Request, res: Response) => {
  const { params } = req;
  const id = params.id;

  try {
    const { data, error } = await supabase
      .from("flashcards")
      .delete()
      .eq("app_id", id)
      .select("app_id");

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to delete flashcard",
        message: error.message,
      });
    }

    // Check if flashcard was found
    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Flashcard not found",
        message: `No flashcard found with id: ${id}`,
      });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Unexpected error in deleteFlashcard:", err);

    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    res.status(500).json({
      error: "Internal server error",
      message: errorMessage,
    });
  }
};

export const updateKnownCount = async (req: Request, res: Response) => {
  const { body, params } = req;
  const id = params.id;
  const knownCount = body.knownCount ?? 0;

  try {
    const { data, error } = await supabase
      .from("flashcards")
      .update({ known_count: knownCount })
      .eq("app_id", id)
      .select("app_id, question, answer, category, known_count");

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to update flashcard known_count",
        message: error.message,
      });
    }

    // Check if flashcard was found
    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Flashcard not found",
        message: `No flashcard found with id: ${id}`,
      });
    }

    const flashcard = mapFlashcardFromDB(data[0]);

    res.status(200).json({ flashcard });
  } catch (err) {
    console.error("Unexpected error in updateKnownCount:", err);

    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    res.status(500).json({
      error: "Internal server error",
      message: errorMessage,
    });
  }
};
