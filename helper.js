import jwt from 'jsonwebtoken';
import * as Errors from "./errors.js"

/**
 * @param {Request} request 
 * @returns {*} decodedToken
 */
export function decodeToken(request) {
    // Retrieve the header
    const authHeader = request.headers['authorization'];
  
    // Check if the header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Errors.MissingTokenError('Authorization header missing or invalid');
    }
  
    // Retrieve the token
    const token = authHeader.split(' ')[1];
  
    try {
      // Verify the token
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      throw new Errors.InvalidTokenError("Invalid token");
    }
  }