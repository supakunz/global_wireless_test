import axios from "axios";

export const getusers = async () => {
  const response = await axios.get('/api/users')
  return response;
}

export const updateusers = async (id, data) => {
  const response = await axios.put('/api/users/' + id, data)
  return response;
}

export const removeusers = async (id) => {
  const response = await axios.delete('/api/users/' + id, id)
  return response;
}