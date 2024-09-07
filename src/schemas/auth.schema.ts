import { z, ZodType } from "zod"

export type UserRegistrationProps = {
    type: string
    fullname: string
    email: string
    confirmEmail: string
    password: string
    confirmPassword: string
    otp: string
}

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z.object({
    type:z.string().min(1),
    fullname:z.string().min(4,{message: "your full name must be atleast 4 characters long"}),
    email: z.string().email({ message: "Incorrect email format"
    }),
    confirmEmail: z.string().email({ message: "confirm email must be same as email"}),
    password: z.string().min(8, { message: "Your password must be atleast 8 character long"})
    .max(64, { message: "Your password can not be longer than 64 character long"})
    .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        "password should contain only alphabets and numbers"
    ),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: "You must eneter a 6 digit code"}),
}).refine((data)=>data.password === data.confirmPassword,{
    message: "Passwords must match",
    path: ["confirmPassword"]
}).refine((data)=> data.email === data.confirmEmail, {
    message: "Email must match",
    path: ["confirmEmail"],
});

export type UserLoginProps = {
    email: string
    password: string
}

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
    email:z.string().email({ message: "Incorrect email format"}),
    password: z.string().min(8, { message: "Your password must be atleast 8 character long"})
});

export type ChangePasswordProps = {
    password: string
    confirmPassword: string
}

export const ChangePasswordSchema : ZodType<ChangePasswordProps> = z.object({
    password: z.string().min(8, { message: "Your password must be atleast 8 character long"}),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"]
})
