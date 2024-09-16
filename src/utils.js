import axios from "axios";
const newsApi = axios.create({
  baseURL: "https://backend-newsapi-project.onrender.com/",
});

export const getAllArticles = () => {
  return newsApi.get("/api/articles").then(({data}) => {
    return data;
  });
};
