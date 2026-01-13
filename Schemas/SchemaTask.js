import { z } from "zod"

export const tasksValidationSchema = z.object({
    title: z.string().min(5, 'title must be at least 5 char'),
    description: z.string().optional(),
    status: z.enum(["pending", "in progress", "completed"]).optional(),
    dueDate: z.string().optional(),
})