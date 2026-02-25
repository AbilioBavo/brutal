import { z } from "zod";

const CreateClientSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.date().or(z.string()).refine((val) => val instanceof Date || !isNaN(Date.parse(val)), 'Invalid date'),
  email: z.string(),
  phone: z.string(),
  bestieFirstName: z.string().optional(),
  bestieLastName: z.string().optional(),
  bestiePhone: z.string().optional()
});

export default CreateClientSchema;

export type CreateClientSchemaType = z.infer<typeof CreateClientSchema>;
