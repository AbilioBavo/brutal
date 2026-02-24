import { z } from "zod";

const ClientSchema = z.object({
  id: z.string(),
  createdAt: z.date().or(z.string()).refine((val) => val instanceof Date || !isNaN(Date.parse(val)), 'Invalid date'),
  updatedAt: z.date().or(z.string()).refine((val) => val instanceof Date || !isNaN(Date.parse(val)), 'Invalid date'),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  phone: z.string(),
  bestieFirstName: z.string().optional(),
  bestieLastName: z.string().optional(),
  bestiePhone: z.string().optional()
});

export default ClientSchema;

export type ClientSchemaType = z.infer<typeof ClientSchema>;
