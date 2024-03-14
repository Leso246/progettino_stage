import { registerUser } from "../services/register_service.js"

// Register controller
/**
 * @param {Request} request 
 * @param {Response} response
 * @returns {Response} the http response
 */
export async function registerHandler(request, response){
  try {
    const result = registerUser(request);
    return response.status(201).send({ message: result});
  } catch (error) {
    return response.status(400).send({ error: error.message})
  }
}

/**
 * @param {Request} request
 * @param {Response} response
 */
export async function loginHandler(request, response){
  // Validazione body

  // body
}


/**
 * @param {Request} request
 * @param {Response} response
 */
export async function deleteHandler(request, response){

}