import User from "@/models/user"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import connect from "@/lib/connect"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        //**connectDB**
        await connect()
        //credentials -> ข้อมูลที่ส่งมาจากform
        const { email, password } = credentials
      
          //ดึงค่าข้อมูลที่ตรงกับ email จาก database
          const user = await User.findOne({ email })
          console.log(user)
          if (
            user &&
            (await bcrypt.compare(password, user.password))
          ) {
            return {
              //**ค่าที่แสดงที่ Session */
              id: user.id,
              name: user.firstName +" "+ user.lastName,
              email: user.email,
              // role: user.role, // ทำการเพิ่ม role จากการดึงผ่าน database ส่งออกไป
            }
          } else {
             throw new Error('Invalid email or password.')
          }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { //กำหนดหน้า
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        // token.role = user.role // เพิ่ม role เข้าไป
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id
        // session.user.role = token.role // เพิ่ม role เข้าไป
      }
      return session
    },
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
