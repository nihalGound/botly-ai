'use client'

import { onIntegrateDomain } from "@/actions/settings";
import { useToast } from "@/components/ui/use-toast";
import { AddDomainSchema } from "@/schemas/setting.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form"; 

const cloudianryCofig = {
    cloud_name : process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
    upload_preset : process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
    folder_name : process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME as string
}

const uploadCloudinar = async (file:any) => {
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset",cloudianryCofig.upload_preset);
    formData.append("folder",cloudianryCofig.folder_name);
    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudianryCofig.cloud_name}/image/upload`,
            {
                method: "POST",
                body:formData,
            }
        );
        const data = await response.json();
        if(data?.public_id) {
            return data.public_id;
        }
        return null;
    } catch (error) {
        console.log("Error in uplading file : ",error);
    }
}

export const useDomain = () => {
    const {register, handleSubmit, formState:{errors}, reset} = useForm<FieldValues>({
        resolver:zodResolver(AddDomainSchema),
    })

    const pathname = usePathname();
    const { toast } = useToast();
    const [loading,setLoading] = useState<boolean>(false);
    const [isDomain,setIsDomain] = useState<string | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        setIsDomain(pathname.split("/").pop());
    },[pathname] )

    const onAddDomain = handleSubmit(async (values: FieldValues) => {
        setLoading(true);
        // const uploaded = await upload.uploadFile(values.image[0]);
        const uploaded = await uploadCloudinar(values.image[0]);
        const domain = await onIntegrateDomain(values.domain, uploaded);
        if(domain){
            reset();
            setLoading(false);
            toast({
                title: domain.status === 200 ? "Success" : "Error",
                description: domain.message
            })
            router.refresh();
        }
    })

    return {
        register,
        onAddDomain,
        errors,
        loading,
        isDomain,
    }
}
