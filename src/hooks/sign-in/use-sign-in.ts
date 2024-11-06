import { useToast } from "@/components/ui/use-toast"
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const UseSignInForm = () => {
    const { toast } = useToast();
    const { isLoaded, setActive, signIn } = useSignIn();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const methods = useForm<UserLoginProps>({
        resolver: zodResolver(UserLoginSchema),
        mode: "onChange",
    });

    const onHandleSubmit = methods.handleSubmit(
        async (values: UserLoginProps) => {
            if (!isLoaded) return;

            try {
                setIsLoading(true);
                const authenticated = await signIn.create({
                    identifier: values.email,
                    password: values.password,
                })

                if (authenticated.status === "complete") {
                    await setActive({ session: authenticated.createdSessionId })
                    toast({
                        title: "Success",
                        description: "Welcome back!",
                    })
                    setIsLoading(false)
                    console.log("Reirecing to dashboard ...")
                    // router.push("/dashboard");
                    window.location.href = "/dashboard"
                }
            } catch (error:any) {
                setIsLoading(false)
                if (error.errors[0].code === "form_password_incorrect")
                    toast({
                        title: "Error",
                        description: "email/password is incorrect try again",
                    })

            }
        }
    )

    return {
        methods,
        onHandleSubmit,
        isLoading
    }
}