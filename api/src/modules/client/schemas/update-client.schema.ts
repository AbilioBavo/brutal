import { z } from "zod";

const UpdateClientSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  birthDate: z.date().or(z.string()).refine((val) => val instanceof Date || !isNaN(Date.parse(val)), 'Invalid date').optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  bestieFirstName: z.string().optional(),
  bestieLastName: z.string().optional(),
  bestiePhone: z.string().optional()
});

export default UpdateClientSchema;

export type UpdateClientSchemaType = z.infer<typeof UpdateClientSchema>;
