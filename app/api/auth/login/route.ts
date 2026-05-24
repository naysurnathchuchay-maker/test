import { NextResponse } from "next/server";
//import { users } from "@/lib/users";
import {prisma} from "@/lib/prisma";

export async function POST(request: Request) {  
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({
        where: { email, password }
    });
    if (user) {
        return NextResponse.json({
            success: true,
            message: "Login successful",
            token: "fake-jwt-token",
           
        });
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

  