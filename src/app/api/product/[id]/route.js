import { NextResponse } from "next/server";
// import fs from 'fs';
// import { pipeline } from 'stream';
import { put,del } from '@vercel/blob';
// import { promisify } from 'util';
import connect from "@/lib/connect";
import Products from "@/models/model";
// const pump = promisify(pipeline);

//Update data
export async function PUT(req,{params}) {
  try {
    connect() //Conect Database
    const id = params.id
    const formData = await req.formData(); //แปลงจาก Formdata เป็น Object
    const file = formData.getAll('file')[0] //แยก object ของ file
    const fileold = formData.getAll('fileold')[0] //แยก object ของ file
    const data = {
      name:formData.get('name'),
      price:formData.get('price'),
      detail:formData.get('detail')
    }
    if (file) {
      //Generrate name image
      const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9) + '_' // Genชื่อไฟล์ที่ตั้ง
      const filename = 'product_' + uniqueSuffix + file.name //ชื่อไฟล์
      
      //Creqte on Server
      // const filePath = `./public/file/${filename}`; // Create file path
      // //Create image of filePath
      // await pump(file.stream(), fs.createWriteStream(filePath));
      
      //Create file image on vercel storage
      const blob = await put(filename, file, {
        access: 'public',
      });
      // สร้าง file ใน object of data
      data.file = blob.url

      if (fileold != 'noimage.jpg') {
        await del(fileold)
      }
      
      // if (fileold != 'noimage.jpg') {
      //   // await fs.unlink('./public/file/'+fileold,(err) => console.log(err))
      // }
    }
    const updated = await Products.findOneAndUpdate({ _id: id }, data, { new: true })
    return NextResponse.json({message:"Update Successfuly"})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}

//Delete data
export async function POST(req,{params}) {
  try {
    connect()
    const { url } = await req.json();
    const id = params.id
    const response = await Products.findByIdAndDelete({_id:id})
    if (response.file != 'noimage.jpg') {
    //   await fs.unlink('./public/file/'+response.file,(err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log('Remove success')
    //     }
    // })
    await del(url)
    }
    return NextResponse.json({message:"Remove Successfuly"})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}