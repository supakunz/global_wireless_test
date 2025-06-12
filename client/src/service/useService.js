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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.errors || "Sign up failed.");
  }

  return data;
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

export const getAlluser = async (token) => {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // แนบ token ที่นี่
    },
  });
  const data = await res.json();
  return data; // หรือ return data ทั้งหมดแล้วไปจัดการใน caller
};

export const getUserById = async (id, token) => {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // แนบ token ที่นี่
    },
  });
  const data = await res.json();
  return data[0]; // หรือ return data ทั้งหมดแล้วไปจัดการใน caller
};

export const updateUser = async (id, userData, token) => {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // แนบ token ที่นี่
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.errors || "Sign up failed.");
  }
  // console.log("res ====>", res);
  return data;
};

export const deleteUser = async (id, token) => {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // แนบ token ที่นี่
    },
    body: JSON.stringify({ id }),
  });
  return res.json();
};
