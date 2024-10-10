import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0', // Listen on all network interfaces
    port: env.PORT,
  })
  .then(() => console.log('HTTP server is running'))
