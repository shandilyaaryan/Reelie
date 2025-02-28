import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await res.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required!" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const exitstingUser = await User.findOne({ email });

    if (exitstingUser) {
      return NextResponse.json(
        { error: "User is already registered" },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
