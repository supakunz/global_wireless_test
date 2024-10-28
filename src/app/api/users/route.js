import { NextResponse } from "next/server";
import connect from "@/lib/connect";
import User from "@/models/user";

export const dynamic = 'force-dynamic';
//Get data
export async function GET(req) {
  try {
    connect() //Conect Database
    const response = await User.find({})
    return NextResponse.json({response})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}