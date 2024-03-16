import { decodeToken } from "../helper.js";
import { postData } from "../services/post_data_service.js";
import { getData } from "../services/get_data_service.js";
import { deleteData } from "../services/delete_data_service.js";
import * as Errors from "../errors.js";

/**
 * @param {Request} request 
 * @param {Response} response 
 * @returns { Response } response 
 */
export async function postDataHandler(request, response) {
  try {

    // Verify the token
    const decoded = decodeToken(request);

    // Retrieve user email from token
    const userEmail = decoded.email;

    let { email: targetEmail, key, data } = request.body;

    data = encodeToBase64(data);
    
    let result = "";

    if(targetEmail !== undefined) {
      if(decoded.admin || userEmail === targetEmail) {
        result = postData(targetEmail, key, data);
      } else {
        return new Errors.AccessDeniedError("Access denied");
      }
    } else {
      result = postData(userEmail, key, data);
    }

    return response.status(201).send(result);

  } catch (error) {
    return response.status(error.status).send({ error: error.message });
  }
}

/**
 * @param {request} request 
 * @param {response} response 
 * @returns { response } response
 */
export async function getDataHandler(request, response) {
  const { key, email: targetEmail } = request.params;

  if(!key) {
    return new Errors.MissingKeyError("Missing key parameter");
  }

  // Verify the token
  const decoded = decodeToken(request);

  // Retrieve user email from token
  const userEmail = decoded.email;

  let result;

  if(targetEmail !== undefined) {
    if(decoded.admin || targetEmail === userEmail) {
      result = getData(targetEmail, key);
    } else {
      return new Errors.AccessDeniedError("Access denied");
    }
  } else {
    result = getData(userEmail, key);
  }

  return response.status(201).send(result);
}

/**
 * @param {request} request 
 * @param {response} response 
 */
export async function deleteDataHandler(request, response) {
  const { key, email: targetEmail } = request.params;

  if(!key) {
    return new Errors.MissingKeyError("Missing key parameter");
  }

  // Verify the token
  const decoded = decodeToken(request);

  let result;

  if(targetEmail !== undefined) {
    if(decoded.admin || decoded.email === targetEmail) {
      result = deleteData(targetEmail, key);
    } else {
      throw new Errors.AccessDeniedError("Access denied");
    }
  } else {
    result = deleteData(decoded.email, key);
  }

  return response.status(201).send(result);

}

/**
 * @param {string} str 
 * @returns {string} string
 */
function encodeToBase64(str) {
    try {  
      atob(str);
      return str;
    } catch (err) {
      return btoa(str);
    }
  }