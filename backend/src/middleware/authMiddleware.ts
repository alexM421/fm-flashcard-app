import { NextFunction, Request, Response } from "express";
import { supabase, getSupabaseWithAuth } from "../lib/supabase.js";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing auth header" });
  }

  const token = authHeader.replace("Bearer ", "");

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  // Attach user, token, and a Supabase client that uses this JWT for all requests.
  // Use req.supabase in route handlers so RLS and auth apply to the correct user.
  req.user = user;
  req.token = token;
  req.supabase = getSupabaseWithAuth(token);

  next();
}