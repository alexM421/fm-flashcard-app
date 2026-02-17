import { NextFunction, Request } from "express";
import { Response } from "express";
import { supabase } from "../lib/supabase";

export default async function authMiddleware (
    req: Request,
    res: Response,
    next: NextFunction,
) {

    const authHeader = req.headers.authorization
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Missing auth header' });
    }

    const token = authHeader.replace('Bearer ', '')

    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    console.log('User authenticated');
    next()
}