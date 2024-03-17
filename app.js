import Fastify from 'fastify'
import * as usersController from "./controllers/users_controller.js"
import * as dataController from "./controllers/data_controller.js"
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
  handler: usersController.registerHandler
});

fastify.post('/login', {
  schema: {
    body: Schemas.loginSchema,
  },
  handler: usersController.loginHandler
});

fastify.delete('/delete', usersController.deleteHandler);

fastify.post('/postData', {
  schema: {
    body: Schemas.postDataSchema,
  },
  handler: dataController.postDataHandler
});

fastify.get('/getData/:key/:email?', dataController.getDataHandler);

fastify.patch('/patchData/:key/:email?', {
  schema: {
    body: Schemas.patchDataSchema,
  },
  handler: dataController.patchDataHandler
});

fastify.delete('/deleteData/:key/:email?', dataController.deleteDataHandler);

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}