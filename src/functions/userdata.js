import axios from "axios";

export const getusers = async () => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API + 'api/users')
  return response;
}

export const updateusers = async (id, data) => {
  const response = await axios.put(process.env.NEXT_PUBLIC_API + 'api/users/' + id, data)
  return response;
}

export const removeusers = async (id) => {
  const response = await axios.delete(process.env.NEXT_PUBLIC_API + 'api/users/' + id, id)
  return response;
}