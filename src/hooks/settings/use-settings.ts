import { onChatBotImageUpdate, onCreateFilterQuestions, onCreateHelpDeskQuestion, onCreateNewDomainProduct, onDeleteUserDomain, onGetAllFilterQuestions, OnGetAllHelpDeskQuestions, onUpdateDomain, onUpdatePassword, onUpdateWelcomeMessage } from "@/actions/settings";
import { toast, useToast } from "@/components/ui/use-toast";
import { ChangePasswordProps, ChangePasswordSchema } from "@/schemas/auth.schema";
import { AddProductProps, AddProductSchema, DomainSettingsProps, DomainSettingsSchema, FilterQuestionsSchema, HelpDeskQuestionsProps, HelpDeskQuestionsSchema } from "@/schemas/setting.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

export const useThemeMode = () => {
    const { setTheme, theme } = useTheme();
    return {
        setTheme,
        theme
    }
};

export const useChangePassword = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordProps>({
        resolver: zodResolver(ChangePasswordSchema),
        mode: 'onChange',
    })
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    const onChangePassword = handleSubmit(async (values) => {
        try {
            setLoading(true)
            const updated = await onUpdatePassword(values.password);
            if (updated && updated.status === 200) {
                reset();
                setLoading(false);
                toast({ title: "Success", description: updated.message })
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

export const useSettings = (id: string) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<DomainSettingsProps>({
        resolver: zodResolver(DomainSettingsSchema),
    })
    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false)
    const [deleting, setDeleting] = useState<boolean>(false)
    const onUpdateSettings = handleSubmit(async (values) => {
        setLoading(true)
        if (values.domain) {
            const domain = await onUpdateDomain(id, values.domain);
            if (domain) {
                toast({
                    title: "Success",
                    description: domain.message,
                })
            }
        }
        if (values.image[0]) {
            // const uploaded = await upload.uploadFile(values.image[0]);
            const uploaded = await uploadCloudinar(values.image[0]);
            const image = await onChatBotImageUpdate(id, uploaded);
            if (image) {
                toast({
                    title: image.status == 200 ? "Success" : "Error",
                    description: image.message,
                });
                setLoading(false)
            }
        }

        if (values.welcomeMessage) {
            const message = await onUpdateWelcomeMessage(values.welcomeMessage, id);
            if (message) {
                toast({
                    title: "Success",
                    description: message.message,
                });
            }
        }
        reset()
        router.refresh()
        setLoading(false)
    })

    const onDeleteDomain = async () => {
        setDeleting(true);
        const deleted = await onDeleteUserDomain(id);
        if (deleted) {
            toast({
                title: deleted.status === 200 ? "Success" : "Error",
                description: deleted.message
            })
        }
        setDeleting(false);
        router.refresh();
    }
    return {
        register,
        onUpdateSettings,
        errors,
        loading,
        onDeleteDomain,
        deleting,
    }
}

export const useHelpDesk = (id: string) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<HelpDeskQuestionsProps>({
        resolver: zodResolver(HelpDeskQuestionsSchema)
    })
    const { toast } = useToast()

    const [loading, setLoading] = useState<boolean>(false)
    const [isQuestions, setIsQuestions] = useState<{ id: string; question: string; answer: string | null }[]>([])
    const onSubmitQuestion = handleSubmit(async (values) => {
        setLoading(true)
        const question = await onCreateHelpDeskQuestion(id, values.question, values.answer)
        console.log("question", question)
        if (question) {
            setIsQuestions(question.questions!)
            toast({
                title: question.status === 200 ? "Success" : "Error",
                description: question.message,
            })
            setLoading(false)
            reset()
        }
        else {
            setLoading(false)
            reset()
        }
    })

    const onGetQuestions = async () => {
        setLoading(true)
        const questions = await OnGetAllHelpDeskQuestions(id);

        if (questions) {
            setIsQuestions(questions.questions!)
        }
        setLoading(false)
    }
    useEffect(() => {
        onGetQuestions();
    }, [])

    return {
        register,
        onSubmitQuestion,
        errors,
        isQuestions,
        loading,
    }
}

export const useFilterQuestions = (id: string) => {
    const { 
        register,
        formState: { errors },
        handleSubmit,
        reset 
    } = useForm<{ question: string }>({
            resolver: zodResolver(FilterQuestionsSchema)
    });
    const {toast} = useToast();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isQuestions, setIsQuestions] = useState<{id:string; question: string}[]>([]);

    const onAddFilterQuestions = handleSubmit(async (values) => {
        setIsLoading(true)
        const questions = await onCreateFilterQuestions(id,values.question);
        if(questions) {
            setIsQuestions(questions.questions!);
            toast({
                title: questions.status ===200 ? "Success" : "Error",
                description: questions.message,
            })
            reset();
            setIsLoading(false);
        }
    })

    const onGetQuestions = async () => {
        setIsLoading(true)
        const questions = await onGetAllFilterQuestions(id);
        if(questions) {
            setIsQuestions(questions.questions!);
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        onGetQuestions();
    },[])

    return {
        register,
        errors,
        onAddFilterQuestions,
        isLoading,
        isQuestions
    }
}

export const useProducts = (id: string) => {
    const {
        register,
        formState:{errors},
        handleSubmit,
        reset,
    } = useForm<AddProductProps>({
        resolver:zodResolver(AddProductSchema),
    });

    const [loading,setLoading] = useState<boolean>(false);

    const onCreateNewProduct = handleSubmit(async (values)=> {
        try {
            setLoading(true);
            const imagePublicId = await uploadCloudinar(values.image[0]);
            const productCreated = await onCreateNewDomainProduct(id,values.name,imagePublicId,values.price);

            if(productCreated) {
                toast({
                    title: productCreated.status === 200 ? "Success": "Oops, something went wrong!!",
                    description: productCreated.message,
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            reset();
        }
    })


    return {
        loading,
        onCreateNewProduct,
        register,
        errors,
    }
}

