//CRUD Function
import axios from "axios"

export const create = async (data) => {
  const response = await axios.post('/api/product',data)
  return response;
}
export const read = async (id) => {
  const response = await axios.get('/api/product/'+ id, id)
  return response;
}
export const getdata = async () => {
  const response = await axios.get('/api/product')
  return response;
}
export const update = async (id, data) => {
  const response = await axios.put('/api/product/' + id, data)
  return response;
}
export const remove = async (id) => {
  const response = await axios.post('/api/product/' + id.id, {url:id.url})
  return response;
}