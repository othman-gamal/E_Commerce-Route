import axios from "@/lib/axios";

export const CategoriesService = {
  getAllCategories() {
    return axios.get("/api/v1/categories");
  },

  getCategoryDetails(id: string) {
    return axios.get(`/api/v1/categories/${id}`);
  },
};
