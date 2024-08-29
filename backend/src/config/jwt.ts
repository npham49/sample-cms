import { NextFunction, Request, Response } from "express";
import * as jose from "jose";

const jwksUri = process.env.JWKS_URI || "";

const JWKS = jose.createRemoteJWKSet(new URL(jwksUri));

export function getBearerTokenFromHeader(authorization: string): string | null {
  console.log(authorization);
  const [, token] = authorization.split("Bearer ");
  return token || null;
}

export async function verifyToken(token: string): Promise<jose.JWTPayload> {
  const { payload } = await jose.jwtVerify(token, JWKS, {});
  return payload;
}

export async function protectMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Middleware started");
  const { authorization } = req.headers;
  if (!authorization) {
    console.log("No authorization header");
    return res.status(401).send("Unauthorized");
  }

  const token = getBearerTokenFromHeader(authorization);
  if (!token) {
    console.log("No token found");
    return res.status(401).send("Unauthorized");
  }

  try {
    const payload = await verifyToken(token);
    if (!payload) {
      console.log("Invalid token");
      return res.status(401).send("Unauthorized");
    }

    res.locals.context = payload;
    console.log("Token verified, proceeding to next middleware");
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    next(error);
  }
}
