"use client"

import { FC, useState } from 'react'
import Button from './ui/Button'
import { addFriendValidator } from '../lib/validations/add-friend'
import axios, { AxiosError } from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Define the props and form data types
interface AddFriendButtonProps {}

type FormData = z.infer<typeof addFriendValidator>

// Component definition
const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
    const [showSuccessState, setShowSuccessState] = useState(false)

    // Set up form with React Hook Form and Zod validation
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(addFriendValidator),
    })

    // Function to add a friend
    const Addfriend = async (email: string) => {
        try {
            // Parse and validate email before sending the request
            const validatedEmail = addFriendValidator.parse({ email }).email
            
            await axios.post('/api/friends/add', {
                email: validatedEmail, // Send as { email: <value> }
            })
    
            setShowSuccessState(true)
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError("email", { message: error.message })
                return
            }
    
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data || "Something went wrong"
                setError("email", { message: errorMessage })
                return
            }
    
            setError("email", { message: "An unexpected error occurred" })
        }
    }
    

    // Form submission handler
    const onSubmit = (data: FormData) => {
        Addfriend(data.email)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Add friend by email
            </label>
            <div className="mt-2 flex gap-4">
                <input
                    {...register("email")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="you@example.com"
                />
                <Button>Add</Button>
            </div>
            <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
            {showSuccessState ? <p className="mt-1 text-sm text-green-600">Friend request sent successfully!</p> : null}
        </form>
    )
}

export default AddFriendButton
