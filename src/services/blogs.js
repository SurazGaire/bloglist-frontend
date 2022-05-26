import axios from "axios";
const baseUrl = "http://localhost:3002/api/blogs";

let token = "";

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  return token;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export default { getAll, create, setToken };
