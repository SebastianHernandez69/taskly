"use server";

import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export interface AuthResult {
    success: boolean;
    message?: string;
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
    try {
    
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
    
        const { account } = await createAdminClient();
    
        const session = await account.createEmailPasswordSession({ email, password });
        
        if (!session || !session.secret) {
            throw new Error("Failed to create session");
        }

        const cookieStore = await cookies();
        cookieStore.set("taskly_session", session.secret, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, 
        })
    
    } catch (error) {
        console.error("Error signing in:", error);
        return { success: false, message: (error as Error).message };
    }

    // On successful sign-in, redirect to the home page
    redirect("/");
}

export async function signUpWithEmail(
    name: string,
    email: string,
    password: string
): Promise<AuthResult> {
    try {
        const { account } = await createAdminClient();

        // 1. Create the user
        await account.create({
            userId: "unique()",
            email,
            password,
            name,
        });

        // 2. Create a session for the user
        const session = await account.createEmailPasswordSession({ email, password });

        if (!session || !session.secret) {
            throw new Error("Failed to create session");
        }

        // 3. Set the session cookie
        const cookieStore = await cookies();
        cookieStore.set("taskly_session", session.secret, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
    } catch (error) {
        console.error("Error signing up:", error);
        return { success: false, message: (error as Error).message };
    }

    // On successful sign-up, redirect to the home page
    redirect("/");
}

export async function signInWithGoogle() {
    const { account } = await createAdminClient();
    const headerList = await headers();
    const origin = headerList.get("origin");

    const redirectUrl = await account.createOAuth2Token({
        provider: OAuthProvider.Google,
        success: `${origin}/oauth`,
        failure: `${origin}/login`,
    });

    return redirect(redirectUrl);
}

// TODO
export async function signOut() {
    try {
        const { account } = await createSessionClient();
        
        await account.deleteSession({ sessionId:"current" });
    } catch (error) {
        console.error("Error deleting session:", error);
    }

    const cookieStore = await cookies();
    cookieStore.delete("taskly_session");

    redirect("/login");
}