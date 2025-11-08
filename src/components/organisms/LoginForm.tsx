"use client";

import { Heading } from "../atoms/Heading";
import { FormInput } from "../molecules/FormInput";
import { Divider } from "../atoms/Divider";
import { SecondaryButton } from "../molecules/SecondaryButton";
import { GoogleIcon } from "@/Icons/Google";
import { Button } from "../ui/button";
import { signInWithEmail, signInWithGoogle } from "@/lib/server/actions/auth";
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        const res = await signInWithEmail(data.email, data.password);

        if (res && !res.success) {
            toast.error(res.message || "Something went wrong");
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <Heading>Log in</Heading>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <FormInput 
                            {...register("email")}
                            placeholder="Email"
                            type="text"
                            disabled={isSubmitting}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    
                    <div className="h-6" />

                    <div>
                        <FormInput 
                            {...register("password")}
                            placeholder="Password"
                            disabled={isSubmitting}
                            type="password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting || Object.keys(errors).length > 0}
                        className="w-full h-12 text-base font-semibold rounded-lg text-white mt-6">
                        {isSubmitting ? "Logging in..." : "Log In"}
                    </Button>
                </form>

                <Divider 
                    text="or continue with"
                />
                
                <form action={signInWithGoogle}>
                    <SecondaryButton
                        icon={GoogleIcon}
                    >Google</SecondaryButton>
                </form>

                <div className="text-sm text-center text-gray-500 mt-4">
                    Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
                </div>
            </div>
        </div>
    )
}