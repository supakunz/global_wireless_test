import connect from "@/lib/connect";
import Products from "@/models/model";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
  try {
    return NextResponse.json({params:params.id})

  } catch (error) {
    console.log(error)
  }
}

export async function DELETE(req,{params}) {
  try {
    connect()
    const id = params.id
    await Products.findByIdAndDelete({_id:id})
    return NextResponse.json({params:id})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}