import axios from "axios";

const YOUR_ACCESS_KEY = "8YrNbnLrWjWP4ECCmZfelNRA90wwa9-O376jmJgLzEI";

export const fetchImages = async (query: string, page: number) => {
  axios.defaults.baseURL = "https://api.unsplash.com";

  const response = await axios.get("/search/photos", {
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
