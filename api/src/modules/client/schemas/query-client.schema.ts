import { z } from "zod";

const StringFilterSchema = z.object({
  icontains: z.string().optional()
});

const NumberFilterSchema = z.object({
  equals: z.coerce.number().optional(),
  gte: z.coerce.number().optional(),
  lte: z.coerce.number().optional()
});

const DateTimeFilterSchema = z.object({
  equals: z.string().optional(),
  gte: z.string().optional(),
  lte: z.string().optional()
});

const QueryClientSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().max(100).optional(),
  sort: z.string().optional(),
  fields: z.string().optional(),
  firstName: StringFilterSchema.optional(),
  lastName: StringFilterSchema.optional(),
  age: NumberFilterSchema.optional(),
  email: StringFilterSchema.optional(),
  phone: StringFilterSchema.optional(),
  bestieFirstName: StringFilterSchema.optional(),
  bestieLastName: StringFilterSchema.optional(),
  bestiePhone: StringFilterSchema.optional(),
  createdAt: DateTimeFilterSchema.optional(),
  updatedAt: DateTimeFilterSchema.optional()
});

export default QueryClientSchema;

export type QueryClientSchemaType = z.infer<typeof QueryClientSchema>;
