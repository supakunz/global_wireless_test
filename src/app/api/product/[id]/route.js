import { NextResponse } from "next/server";

export async function GET(req,{params}) {
  try {
    return NextResponse.json({params:params.id})

  } catch (error) {
    console.log(error)
  }
}