import axios from "axios";
const newsApi = axios.create({
  baseURL: "https://backend-newsapi-project.onrender.com/",
});

export const getAllArticles = () => {
  return newsApi.get("/api/articles").then(({data}) => {
    return data;
  });
};

export const getArticleById = (article_id) => {
    return newsApi.get(`/api/articles/${article_id}`).then(({ data }) => {
      return data;
    });
  };

export const getCommentsByArticleId = (article_id) => {
    return newsApi.get(`/api/articles/${article_id}/comments`).then(({ data }) => {
        return data;
      });
}