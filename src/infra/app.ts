import fastify from "fastify";
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { routes } from "./http/routes";
import { errorHandler } from "./error-handler";
import packageJson from "../../package.json";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'Template Backend Fastify',
      description:
        'Especificações da API Fastify',
      version: packageJson.version,
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(routes)

app.setErrorHandler(errorHandler)

export { app }

