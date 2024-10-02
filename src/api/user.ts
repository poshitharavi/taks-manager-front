import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${API_URL}/user/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/user/login`, {
    email,
    password,
  });

  return response.data;
};
