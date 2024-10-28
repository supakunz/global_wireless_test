import axios from "axios";

export const getusers = async () => {
  const response = await axios.get('/api/users',{
    // query URL without using browser cache
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  })
  return response;
}

export const updateusers = async (id, data) => {
  const response = await axios.put('/api/users/' + id, data,{
    // query URL without using browser cache
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  })
  return response;
}

export const removeusers = async (id) => {
  const response = await axios.delete('/api/users/' + id, id,{
    // query URL without using browser cache
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  })
  return response;
}