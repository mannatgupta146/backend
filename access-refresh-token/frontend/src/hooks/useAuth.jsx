import { useState } from "react"
import { useForm } from "react-hook-form"

export const useAuth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
        email: '',
        password: '',
        }
    })

    const onLoginSubmit = async (data) => {
        console.log('Login Data Submitted:', data)
        alert('Login Successful (Check console for data)')
    }

    const onRegisterSubmit = async (data) => {
        console.log('Register Data Submitted:', data)
        alert('Registration Successful (Check console for data)')
    }

    return { register, onLoginSubmit, onRegisterSubmit, errors, isSubmitting, showPassword, setShowPassword, handleSubmit }
}