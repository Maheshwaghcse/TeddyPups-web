import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";
import { ApiError } from "./errorHandler.js";

/** Validates admin secret header for management endpoints. */
export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
  const provided = req.header("x-admin-secret");
  if (!provided || provided !== env.adminSecret) {
    next(new ApiError(401, "Unauthorized: invalid or missing admin secret"));
    return;
  }
  next();
}

