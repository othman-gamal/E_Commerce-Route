import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : process.env.NEXT_PUBLIC_BASE_URL,
});

export default axiosInstance;
