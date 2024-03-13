import Fastify from 'fastify'
import * as loginController from "./controllers/login.js"

/**
 * 
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})



fastify.post('/register', loginController.registerHandler)
fastify.post('/login', loginController.loginHandler)
fastify.delete('/delete', loginController.deleteHandler)

// Cosine da guardare:
// - Middleware per check dell'autenticazione
// - Middleware per la gestione degli errori, NOT_FOUND_ERROR, UNATHORIZED_ERROR 
// 

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}