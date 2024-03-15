import Fastify from 'fastify'
import * as loginController from "./controllers/login.js"
import * as Schemas from "./schemas.js"
import 'dotenv/config';

/**
 * 
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})


fastify.post('/register', {
  schema: {
    body: Schemas.registerSchema,
  },
  handler: loginController.registerHandler
})

fastify.post('/login', {
  schema: {
    body: Schemas.loginSchema,
  },
  handler: loginController.loginHandler
})

fastify.delete('/delete', loginController.deleteHandler);

fastify.post('/data', loginController.postDataHandler); 

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}