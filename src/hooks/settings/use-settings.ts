"use client"

import { onUpdatePassword } from "@/actions/settings";
import { useToast } from "@/components/ui/use-toast";
import { ChangePasswordProps, ChangePasswordSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadClient } from "@uploadcare/upload-client"
import { useTheme } from "next-themes";
import { useState } from "react";
import { useForm } from "react-hook-form";


export const useThemeMode = () => {
    const {setTheme, theme} = useTheme();
    return {
        setTheme,
        theme
    }
};

export const useChangePassword = () => {
    const {register, handleSubmit, formState:{errors}, reset} = useForm<ChangePasswordProps>({
        resolver: zodResolver(ChangePasswordSchema),
        mode: 'onChange',
    })
    const {toast} = useToast();
    const [loading,setLoading] = useState<boolean>(false);

    const onChangePassword = handleSubmit(async (values) =>{
        try {
            setLoading(true)
            const updated = await onUpdatePassword(values.password);
            if(updated && updated.status===200){
                reset();
                setLoading(false);
                toast({title: "Success", description: updated.message})
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    })

    return {
        register,
        errors,
        onChangePassword,
        loading
    }
}


