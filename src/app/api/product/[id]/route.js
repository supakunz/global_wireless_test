import connect from "@/lib/connect";
import Products from "@/models/model";
import fs from 'fs';
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
    const response = await Products.findByIdAndDelete({_id:id})
    if (response.file != 'noimage.jpg') {
      await fs.unlink('./public/file/'+response.file,(err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Remove success')
        }
    })
    }
    console.log(response)
    return NextResponse.json({params:id})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}