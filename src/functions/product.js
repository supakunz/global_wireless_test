//CRUD Function
import axios from "axios"

export const create = async (data) => {
  const response = await axios.post(process.env.NEXT_PUBLIC_API + 'api/product',data)
  return response;
}
export const read = async (id) => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API + 'api/product/'+ id, id)
  return response;
}
export const getdata = async () => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API + 'api/product')
  return response;
}
export const update = async (id, data) => {
  const response = await axios.put(process.env.NEXT_PUBLIC_API + 'api/product/' + id, data)
  return response;
}
export const remove = async (id) => {
  const response = await axios.delete(process.env.NEXT_PUBLIC_API + 'api/product/' + id, id)
  return response;
}