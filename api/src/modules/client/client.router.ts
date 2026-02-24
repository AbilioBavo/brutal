import { ArkosRouter } from 'arkos'
import clientController from "./client.controller"
import { RouterConfig } from 'arkos'
import CreateClientSchema from './schemas/create-client.schema'

export const config: RouterConfig<"prisma"> = {
  createOne:{
    authentication:false,
    validation:{
      body:CreateClientSchema
    },
  }
 }

const clientRouter = ArkosRouter()

clientRouter.get(
  {
    path: "/custom-endpoint",
    authentication: { action: "CustomAction", resource: "client" },
    validation: {},
    experimental: {
      openapi: {},
      // uploads: {}
    }
  },
  // clientController.someHandler
)

export default clientRouter
