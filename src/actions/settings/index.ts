"use server"
import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs"
import { ReceiptRussianRuble } from "lucide-react";

export const onIntegrateDomain = async (domain: string, icon: string) => {
    const user = await currentUser();
    if(!user)return 
    try {
        const subscription = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                _count: {
                    select: {
                        domains: true,
                    },
                },
                subscription: {
                    select: {
                        plan: true,
                    },
                },
            },
        });

        const domainExist = await client.user.findFirst({
            where: {
                clerkId: user.id,
                domains: {
                    some: {
                        name: domain,
                    },
                },
            },
        });

        if(!domainExist){
            if((subscription?.subscription?.plan == "STANDARD" && subscription._count.domains <1) ||
            (subscription?.subscription?.plan == "PRO" && subscription._count.domains <5) || (subscription?.subscription?.plan == "ULTIMATE" && subscription._count.domains < 10)){
                const newDomain = await client.user.update({
                    where: {
                        clerkId: user.id,
                    },
                    data: {
                        domains: {
                            create: {
                                name: domain,
                                icon,
                                chatBot: {
                                    create: {
                                        welcomeMessage: "Hey there, have a question ? Text us here",
                                    },
                                },
                            },
                        },
                    },
                });
                if(newDomain){
                    return {status:200, message: "Domain successfully added"};
                }
            }
            return {
                status: 400,
                message: "You've reached the maximum number of domains, upgrade your plan",
            }
        }
        return {
            status:400,
            message: "Domain already exist",
        }
    } catch (error) {
        console.log(error);
    }
}

export const onGetSubscriptionPlan = async () => {
    try {
        const user = await currentUser()
        if(!user)return ;
        const plan = await client.user.findUnique({
            where: {
                clerkId:user.id,
            },
            select: {
                subscription: {
                    select: {
                        plan:true,
                    },
                },
            },
        });
        if(plan){
            return plan.subscription?.plan
        }
    } catch (error) {
        console.log(error);
    }
}

export const onGetAllAccoutDomains = async () =>{
    const user = await currentUser();
    if(!user)return ;
    try {
        const domains = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                id:true,
                domains: {
                    select: {
                        name:true,
                        icon: true,
                        id:true,
                        customer: {
                            select: {
                                chatRoom: {
                                    select: {
                                        id:true,
                                        live: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return { ...domains};
    } catch (error) {
        console.log(error)
    }
}

export const onUpdatePassword = async (password:string) => {
    try {
        const user = await currentUser();
        if(!user) return null;

        const update = await clerkClient.users.updateUser(user.id, {password});
        if(update){
            return {status: 200, message: "Password updated"};
        }
    } catch (error) {
        return {status:500, message: "Error, not able to update password"};
    }
}

export const onGetCurrentDomainInfo = async (domain:string) => {
    try {
        const user = await currentUser();
        if(!user)return null;

        const domainInfo = await client.user.findUnique({
        where: {
            clerkId: user.id
        },
        select: {
            domains : {
                where: {
                    name: {
                        contains: domain
                    },
                },
                select: {
                    id:true,
                    name: true,
                    icon: true,
                    userId: true,
                    chatBot: {
                        select: {
                            id:true,
                            welcomeMessage: true,
                            icon: true
                        },
                    },
                },
            },
            subscription: true
        },
        });
        if(domainInfo){
           return domainInfo;
        }
        else{
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const onUpdateDomain = async (id:string, name: string) => {
    try {
        //check if domain with name exist
        const domainExist = await client.domain.findFirst({
            where: {
                name: {
                    contains: name,
                },
            },
        })

        if(!domainExist) {
            const domain = await client.domain.update({
                where: {
                    id,
                },
                data: {
                    name,
                },
            })

            if(domain) {
                return {
                    status: 200,
                    message: "Domain updated",
                }
            }

            return {
                status: 400,
                message: "Oops something went wrong!",
            }
        }
        return {
            status: 400,
            message: "Domain with this name already exist",
        }
    } catch (error) {
        console.log(error)
    }
}

export const onChatBotImageUpdate = async (id:string, icon: string) => {
    const user = await currentUser()

    if(!user) return 

    try {
        const domain = await client.domain.update({
            where: {
                id,
            },
            data: {
                chatBot: {
                    update: {
                        data: {
                            icon,
                        },
                    },
                },
            },
        })

        if(domain) {
            return {
                status: 200,
                message: "Domain updated",
            }
        }

        return {
            status: 400,
            message: "Oops something went wrong!",
        }
    } catch (error) {
        console.log(error);
    }
}

export const onUpdateWelcomeMessage = async (message: string, id:string) => {
    try {
        const update = await client.domain.update({
            where: {
                id,
            },
            data: {
                chatBot: {
                    update: {
                        data: {
                            welcomeMessage: message,
                        },
                    },
                },
            },
        })
        if(update) {
            return {
                status: 200,
                message: "Welcome message Updated"
            }
        }

    } catch (error) {
        console.log(error);
    }
}

export const onDeleteUserDomain = async (id:string) => {
    const user = await currentUser();
    if(!user)return ;
    try {
        //validate user
        const validUser = await client.user.findFirst({
            where: {
                clerkId: user.id,
            },
            select: {
                id:true
            }
        });

        if(validUser) {
            //check that domain belongs to current user and then delete it
            const deletedDomain = await client.domain.delete({
                where: {
                    userId: validUser.id,
                    id,
                },
                select: {
                    name: true
                }
            })
            if(deletedDomain){
                return {
                    status: 200,
                    message: `${deletedDomain.name} was deleted successfully!`
                }
            }
        }
        
        return {
            status: 400,
            message: "Oops something went wrong!"
        }
    } catch (error) {
        console.log(error);
    }
}

export const onCreateHelpDeskQuestion = async (
    id: string,
    question: string,
    answer: string
) => {
    try {
        const helpDeskQuestion = await client.domain.update({
            where: {
                id,
            },
            data: {
                helpdesk: {
                    create: {
                        question,
                        answer,
                    },
                },
            },
            include: {
                helpdesk: {
                    select: {
                        id: true,
                        question: true,
                        answer: true,
                    },
                },
            },
        })
        if(helpDeskQuestion){
            return {
                status: 200,
                message: "New help desk question added",
                questions: helpDeskQuestion.helpdesk,
            }
        }
        return {
            status: 400,
            message: "Oops! something went wrong",
        }
    } catch (error) {
        console.log(error);
    }
}

export const OnGetAllHelpDeskQuestions = async(id:string) => {
    try {
        const questions = await client.helpDesk.findMany({
            where: {
                domainId: id,
            },
            select: {
                question: true,
                answer: true,
                id: true,
            },
        })

        return {
            status: 200,
            message: "New help desk question added",
            questions: questions,
        }
    } catch (error) {
        console.log(error)
    }
}

export const onCreateFilterQuestions = async(id: string, question: string) => {
    try {
        const filterQuestion = await client.domain.update({
            where: {
                id,
            },
            data: {
                filterQuestions: {
                    create: {
                        question,
                    },
                },
            },
            include: {
                filterQuestions: {
                    select: {
                        id: true,
                        question: true,
                    },
                },
            },
        });

        if(filterQuestion){
            return {
                status: 200,
                message: "Filter question is added",
                questions: filterQuestion.filterQuestions
            }
        }
        return {
            status: 400,
            message: "Oops something went wrong!!"
        }
    } catch (error) {
        console.log(error);
    }
}

export const onGetAllFilterQuestions = async (id:string) => {
    try {
        const filterQuestions = await client.filterQuestions.findMany({
            where: {
                domainId:id,
            },
            select: {
                question: true,
                id: true,
            },
            orderBy: {
                question: "asc",
            }
        })
        if(filterQuestions) {
            return {
                status: 200,
                message: "",
                questions: filterQuestions,
            }
        }
        return {
            status: 400,
            message: "Oops! something went wrong"
        }
    } catch (error) {
        console.log(error)
    }
}