import { z } from "zod";

const CreateClientSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  phone: z.string(),
  bestieFirstName: z.string().optional(),
  bestieLastName: z.string().optional(),
  bestiePhone: z.string().optional()
});

export default CreateClientSchema;

export type CreateClientSchemaType = z.infer<typeof CreateClientSchema>;
