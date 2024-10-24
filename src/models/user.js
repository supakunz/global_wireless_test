import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true
    },
    lastName: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    role:{
      type:String,
      default:"user"
    }
  },{
    toJSON:{ // แปลงข้อมูลเมื่อมีการดึงค่า
      virtuals:true,
      transform(doc,ret){
        delete ret.__v //ลบ __v
        ret.id = ret._id //เพิ่ม id = _id
        delete ret._id // ลบ _id
      }
    }
  })

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;