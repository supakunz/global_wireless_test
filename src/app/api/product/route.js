import { NextResponse } from "next/server";
// import fs from 'fs';
import { put } from '@vercel/blob';
// import { pipeline } from 'stream';
// import { promisify } from 'util';
import connect from "@/lib/connect";
import Products from "@/models/model";
// const pump = promisify(pipeline);

//Get data
export async function GET(req) {
  try {
    connect() //Conect Database
    const response = await Products.find({})
    return NextResponse.json({response})

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}

//Create data
export async function POST(req) {
  try {
    connect() //Conect Database
    const formData = await req.formData(); //แปลงจาก Formdata เป็น Object
    const file = formData.getAll('file')[0] //แยก object ของ file
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
    }
    // console.log(data)
    //Send data to Database
    await Products(data).save()
    
    return NextResponse.json({message:'Create Data Successfully'})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}
