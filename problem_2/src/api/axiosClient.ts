import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Tạo instance của Axios
const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://interview.switcheo.com/", // Đổi thành URL API của bạn
  timeout: 10000, // Thời gian timeout (ms)
  headers: {
    "Content-Type": "application/json", // Loại dữ liệu mặc định
  },
});

// Thêm interceptor để xử lý request
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Thêm token hoặc các thông tin xác thực khác nếu cần
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý response
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response; // Chỉ trả về dữ liệu cần thiết
  },
  (error) => {
    // Xử lý lỗi
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosClient;
