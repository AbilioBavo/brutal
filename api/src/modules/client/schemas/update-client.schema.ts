import { z } from "zod";

const UpdateClientSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.number().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  bestieFirstName: z.string().optional(),
  bestieLastName: z.string().optional(),
  bestiePhone: z.string().optional()
});

export default UpdateClientSchema;

export type UpdateClientSchemaType = z.infer<typeof UpdateClientSchema>;
