"use client"

import { useEditEmail } from '@/hooks/email-maketing/use-marketing'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Loader } from '../loader'
import FormGenerator from '../forms/form-generator'
import { Button } from '../ui/button'

type EditEmailProps = {
    id: string
    onCreate(): void
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
    setDefault: UseFormSetValue<FieldValues>
}

const EditEmail = ({
    id,
    onCreate,
    errors,
    register,
    setDefault,
}: EditEmailProps) => {
    const { loading, template } = useEditEmail(id)
    setDefault("description", template ? JSON.parse(template) : "")
    return (
        <form
            onSubmit={onCreate}
            className="flex flex-col gap-3"
        >
            <Loader loading={loading}>
                <FormGenerator
                    name="description"
                    label="Message"
                    register={register}
                    errors={errors}
                    inputType="textarea"
                    lines={10}
                    placeholder="Your email description"
                    type="text"
                />
                <Button>Save</Button>
            </Loader>

        </form>
    )
}

export default EditEmail