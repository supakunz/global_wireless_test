import axios from "axios"

export const signup = async (data) => {
  const response = await axios.post(process.env.NEXT_PUBLIC_API + 'api/register',data)
  return response;
}