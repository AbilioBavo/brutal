import { z } from "zod"
import apiActions from "../../../utils/validation/api-actions"
import { UserRole } from "@prisma/client"

const UpdateUserSchema = z.object({
  email: z.string()
    .optional(),
  isSuperUser: z.boolean().optional(),
  isStaff: z.boolean().optional(),
  isActive: z.boolean().optional(),
  role: z.nativeEnum(UserRole).optional(),
})

export default UpdateUserSchema

export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>
