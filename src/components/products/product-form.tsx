"use client"

import { useProducts } from '@/hooks/settings/use-settings'
import React from 'react'
import FormGenerator from '../forms/form-generator'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { UploadIcon } from 'lucide-react'
import { ErrorMessage } from '@hookform/error-message'
import { Button } from '../ui/button'
import { Loader } from '../loader'

type Props = {
    id: string
}

const CreateProductForm = ({id}: Props) => {
    const {onCreateNewProduct, register, loading, errors} = useProducts(id);

    return (
        <form
            className="mt-3 w-full max-w-md mx-auto flex flex-col gap-5 py-6 sm:py-10 px-4 sm:px-0"
            onSubmit={onCreateNewProduct}
        >
            <FormGenerator 
                inputType="input"
                register={register}
                label="Name"
                name="name"
                errors={errors}
                placeholder="Your product name"
                type="text"
            />

            <div className="flex flex-col items-start w-full">
                <Label
                    htmlFor="upload-product"
                    className="flex flex-col md:flex-row gap-2 rounded-lg bg-peach text-gray-600 cursor-pointer font-semibold text-sm items-center p-2 hover:bg-peach/80 transition-colors"
                >
                    <Input
                        {...register("image")}
                        type="file"
                        id="upload-product"
                        
                    />
                    <div className='flex justify-between gap-x-2 items-center'>
                    <UploadIcon size={18} />
                    Upload Image
                    </div>
                </Label>
                <ErrorMessage
                    errors={errors}
                    name="image"
                    render={({message}) => (
                        <p className="text-red-400 mt-2 text-sm">
                            {message === "Required" ? "" : message}
                        </p>
                    )}
                />
            </div>

            <FormGenerator
                inputType="input"
                register={register}
                label="Price"
                name="price"
                errors={errors}
                placeholder='0.00'
                type="text"
            />

            <Button
                type="submit"
                className="w-full mt-4"
            >
                <Loader loading={loading}>Create Product</Loader>
            </Button>
        </form>
    )
}

export default CreateProductForm