import { ArkosConfig } from 'arkos'

const config: ArkosConfig = {
  authentication: {
    mode: 'static',
    login: {
      allowedUsernames: ['email'],
    }
  },
  routers: {
    strict: "no-bulk"
  },
  validation: {
    resolver: 'zod'
  },
  swagger: {
    mode: 'zod',
    strict: false,
  },
  middlewares: {
    cors: {
      allowedOrigins: process.env.NODE_ENV !== "production" ? "*" : "your-production-url"
    },
  }
}

export default config
