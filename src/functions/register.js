import axios from "axios"

export const signup = async (data) => {
  const response = await axios.post('/api/register',data)
  return response;
}