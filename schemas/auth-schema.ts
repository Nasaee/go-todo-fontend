import { z } from 'zod';

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Please enter your email')
      .email('Invalid email')
      .transform((v) => v.toLowerCase()),

    firstName: z
      .string()
      .min(1, 'First name is required')
      .transform((v) => v.charAt(0).toUpperCase() + v.slice(1)),

    lastName: z
      .string()
      .min(1, 'Last name is required')
      .transform((v) => v.charAt(0).toUpperCase() + v.slice(1)),

    password: z.string().min(6, 'Password must be at least 6 characters'),

    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export { registerSchema, loginSchema };
export type { RegisterSchema, LoginForm };
