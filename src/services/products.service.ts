import axios from "@/lib/axios";

export const ProductsService = {
  getAllProducts() {
    return axios.get("/api/v1/products");
  },

  getSpecificProduct(id: string) {
    return axios.get(`/api/v1/products/${id}`);
  },
};
