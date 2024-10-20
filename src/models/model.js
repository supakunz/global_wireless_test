import mongoose, { Schema } from 'mongoose'

const productsSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    price: {
      type: String,
      require: true
    },
    detail: {
      type: String,
      require: true
    },
    file: {
      type: String,
      default: "noimage.jpg"
    }
  }, {
    toJSON:{ // แปลงข้อมูลเมื่อมีการดึงค่า
      virtuals:true,
      transform(doc,ret){
        delete ret.__v //ลบ __v
        ret.id = ret._id //เพิ่ม id = _id
        delete ret._id // ลบ _id
      }
    }
  })

const Products = mongoose.models.Products || mongoose.model("Products", productsSchema)

export default Products;