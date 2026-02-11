'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/field'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import * as z from 'zod'

const formSchema = z.object({
    title: z
        .string()
        .min(5, 'Bug title must be at least 5 characters.')
        .max(32, 'Bug title must be at most 32 characters.'),
    description: z
        .string()
        .min(20, 'Description must be at least 20 characters.')
        .max(100, 'Description must be at most 100 characters.'),
})

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

type FormType = 'sign-in' | 'sign-up'

const authFormSchema = (formType: FormType) => {
    return z.object({
        email: z.string().email(),
        fullName:
            formType === 'sign-up'
                ? z.string().min(2).max(50)
                : z.string().optional(),
    })
}

const AuthForm = (type: { type: FormType }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const formSchema = authFormSchema(type.type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
        },
    })

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="auth-form"
                >
                    <h1 className="form-title">
                        {type.type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                    </h1>
                    {type.type === 'sign-up' && (
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="shad-form-item">
                                        <FormLabel className="shad-form-label">
                                            Full Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your full name"
                                                className="shad-input"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="shad-form-message" />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            className="shad-input"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="form-submit-button"
                        disabled={isLoading}
                    >
                        {type.type === 'sign-in' ? 'Sign In' : 'Sign Up'}

                        {isLoading && (
                            <Image
                                src="/assets/icons/loader.svg"
                                alt="Loading"
                                width={24}
                                height={24}
                                className="ml-2 animate-spin"
                            />
                        )}
                    </Button>
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}

                    <div className="body-2 flex justify-center">
                        <p className="text-light-100">
                            {type.type === 'sign-in'
                                ? "Don't have an account?"
                                : 'Already have an account?'}
                        </p>
                        <Link
                            href={
                                type.type === 'sign-in'
                                    ? '/sign-up'
                                    : '/sign-in'
                            }
                            className="ml-1 font-medium text-brand"
                        >
                            {type.type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default AuthForm
