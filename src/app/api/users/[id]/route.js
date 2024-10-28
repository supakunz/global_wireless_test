import { NextResponse } from "next/server";
import connect from "@/lib/connect";
import User from "@/models/user";
import bcrypt from 'bcrypt'

export const dynamic = 'force-dynamic';

//Delete user
export async function DELETE(req,{params}) {
  try {
    connect()
    const id = params.id
    const response = await User.findByIdAndDelete({_id:id})
    return NextResponse.json({message:"Remove Successfuly"})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}

//Update user
export async function PUT(req,{params}) {
  try {
    connect() //Conect Database
    const id = params.id
    const { firstName, lastName, email, password, role } = await req.json(); //แปลงจาก Formdata เป็น Object
    const data = {
      firstName,
      lastName,
      email,
      role
    }
    //เมื่อมี password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      data.password = hashedPassword
    } 
    const updated = await User.findOneAndUpdate({ _id: id }, data, { new: true })
    return NextResponse.json({message:"Update Successfuly"})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}