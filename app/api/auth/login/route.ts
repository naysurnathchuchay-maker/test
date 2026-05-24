import { NextResponse } from "next/server";
//import { users } from "@/lib/users";
import {prisma} from "@/lib/prisma";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (user && user.password === password) {
        return NextResponse.json({
            success: true,
            message: "Login successful",
            token: "fake-jwt-token",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

  