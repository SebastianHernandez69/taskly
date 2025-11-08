import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("userId");
    const secret = request.nextUrl.searchParams.get("secret");

    if (!userId || !secret) {
        return NextResponse.redirect(`${request.nextUrl.origin}/login`);
    }

    const { account } = await createAdminClient();

    try {
        const session = await account.createSession({
            userId,
            secret
        });

        const cookieStore = await cookies();
        cookieStore.set("taskly_session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, 
        });

        return NextResponse.redirect(`${request.nextUrl.origin}/`);
    } catch (error) {
        console.error("Error creating session:", error);
        return NextResponse.redirect(`${request.nextUrl.origin}/login`);
    }
}