import axios from "axios";
import { Data, ResponseData } from "./types";

const YOUR_ACCESS_KEY = "8YrNbnLrWjWP4ECCmZfelNRA90wwa9-O376jmJgLzEI";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImages = async (
  query: string,
  page: number
): Promise<{
  imageData: Data[];
  totalPages: number;
}> => {
  const response = await axios.get<ResponseData>("/search/photos", {
    params: {
      query,
      client_id: YOUR_ACCESS_KEY,
      page,
      per_page: 12,
    },
  });
  return {
    imageData: response.data.results,
    totalPages: response.data.total_pages,
  };
};
