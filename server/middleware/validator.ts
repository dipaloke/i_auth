import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Incoming request:", req.method, req.url);
    console.log("Request body:", JSON.stringify(req.body));
    console.log("Request headers:", JSON.stringify(req.headers));

    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        console.log("Validation error:", JSON.stringify(errorMessage));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessage });
      } else {
        console.error("Unexpected error:", error);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal server Error" });
      }
    }
  };
}
