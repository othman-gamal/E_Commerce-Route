import axios from "@/lib/axios";

export const BrandsService = {
  getAllBrands() {
    return axios.get("/api/v1/brands");
  },

  getBrandDetails(id: string) {
    return axios.get(`/api/v1/brands/${id}`);
  },
};
