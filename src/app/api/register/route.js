import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User from "@/models/user";
import connect from "@/lib/connect";

export async function POST(req) { //**ชื่อ Function ใช้กำหนด http method */
  try {
    //Process
    //1.ConnectDB
    connect()
    const { firstName,lastName, email, password } = await req.json()
    const user = await User.findOne({ email }).select("_id")
    //2.Check same email.
    if (user) {
      return NextResponse.json({ message: "Email is already registered." }, { status: 401 })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    //3.Create Models and send to database
    await User.create({ firstName,lastName, email, password: hashedPassword }) //**Password hashed*/

    return NextResponse.json({ message: "User registered" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "An error occured while registrating the user." }, { status: 500 })
  }
}

// GET Method
// export async function GET(req) { //**ชื่อ Function ใช้กำหนด http method */
//   return NextResponse.json({ message: "Hello" })
// }