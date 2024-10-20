import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO)
    console.log("Connect Database")
  } catch (error) {
    console.log('Connect failed!',error)
  }
}

export default connect;