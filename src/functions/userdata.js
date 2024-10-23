import axios from "axios";

export const getusers = async () => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API + 'api/users')
  return response;
}