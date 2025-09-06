import { z } from "zod";

export const personSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  gender: z.string().optional(),
  email: z.email("Email inválido").optional().or(z.literal("")),
  birthDate: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de nascimento inválida",
    }),
  placeOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  taxId: z
    .string()
    .min(1, "CPF é obrigatório")
    .refine((val) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val), {
      message: "CPF deve ser no formato 000.000.000-00",
    }),
});

export type PersonForm = z.input<typeof personSchema>;
