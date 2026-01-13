import { z } from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(2, "Name is reqiured"),
    email: z.string().email("Email must be valid"),
    password: z.string()
        .min(6, "password must be at least six characters")
        .max(100, "password must be at most 100 characters")
        .regex(/[A-Z]/, "must include at least one capital letter")
        .regex(/[a-z]/, "must include at least one small letter")
        .regex(/[0-9]/, "must include at least one number")
        .regex(/[^A-Za-z0-9]/, "must include at least one special character")
})