// services/userService.js
const API_URL = import.meta.env.VITE_APP_API;

export const signUp = async (userData) => {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const signIn = async (userData) => {
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const getAlluser = async () => {
  const res = await fetch(`${API_URL}/api/users`);
  const data = await res.json();
  return data; // หรือ return data ทั้งหมดแล้วไปจัดการใน caller
};

export const getUserById = async (id) => {
  const res = await fetch(`${API_URL}/api/users/${id}`);
  const data = await res.json();
  return data[0]; // หรือ return data ทั้งหมดแล้วไปจัดการใน caller
};

export const updateUser = async (id, userData) => {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res.json();
};
