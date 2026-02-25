import { ArkosConfig } from 'arkos'
const isProduction: boolean = process.env.NODE_ENV === "production";
const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
const config: ArkosConfig = {
  authentication: {
    mode: 'static',
    // enabled:false,
    login: {
      allowedUsernames: ['email'],
    }
  },
  email: {
    host: process.env.EMAIL_HOST!,
    port: Number(process.env.EMAIL_PORT),
    secure: (process.env.EMAIL_SECURE === "true"),
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASSWORD!,
    },
    name: process.env.EMAIL_NAME,
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
    options: {
      tryItOutEnabled: true,
      definition: {
        info: {
          title: "Spark Scrapper API",
          version: "1.0.0",
          description: "API documentation with ArkosRouter integration",
        },
        servers: [
          {
            url: process.env.APP_URL!,
            description: "Production",
          },
        ],
        components: {
          securitySchemes: {
            BearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },

      },
    }
  },
    middlewares: {
    cors: {
      allowedOrigins: allowedOrigins,
    },
  }
}

export default config
