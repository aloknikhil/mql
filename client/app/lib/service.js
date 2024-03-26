import { DATABASE, LOGIN, QUERY, SIGNUP } from "@/app/utils/routes";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import appText from "../assets/strings";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const errCode = error.response.status;
    if (
      errCode === 401 &&
      error.response.data.detail !== "Incorrect Password"
    ) {
      toast.error(appText.toast.errSessionExpired);
      setTimeout(() => {
        Cookies.set("token", "");
        window.location.href = "/login";
      }, 2000);
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(async (request) => {
  const token = Cookies.get("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export const login = async (data) => {
  try {
    const res = await axios.post(LOGIN, data);
    return res;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const getAllDatabase = async () => {
  try {
    const res = await axios.get(DATABASE);
    return res;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const getDatabase = async (id) => {
  try {
    const res = await axios.get(`${DATABASE}/${id}`);
    return res;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const connectDatabase = async (data) => {
  try {
    const res = await axios.post(`${DATABASE}/connect`, data);
    return res;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const uploadSchema = async (formData) => {
  try {
    const res = await axios.post(DATABASE, formData);
    return res;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const askQuery = async (id, payload) => {
  try {
    const res = await axios.post(`${QUERY}/${id}`, payload);
    return res;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const queryHistory = async (id) => {
  try {
    const res = await axios.get(`${QUERY}/${id}/history`);
    return res;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const getQueryHistoryById = async ({ dbId, id }) => {
  try {
    const res = await axios.get(`${QUERY}/${dbId}/history/${id}`);
    return res;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};
