import axios from "axios";
const newsApi = axios.create({
  baseURL: "https://backend-newsapi-project.onrender.com/",
});

export const getAllArticles = () => {
  return newsApi.get("/api/articles").then(({ data }) => {
    return data;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/api/articles/${article_id}`).then(({ data }) => {
    return data;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return newsApi
    .get(`/api/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data;
    });
};

export const postCommentToArticle = (article_id, username, body) => {
  const uploadData = { author: username, body: body };
  return newsApi
    .post(`/api/articles/${article_id}/comments`, uploadData)
    .then(({ data }) => {
      return data;
    });
};

export const patchVotesByArticleId = (article_id, vote_increment) => {
  const uploadData = { inc_votes: vote_increment };
  return newsApi
    .patch(`/api/articles/${article_id}`, uploadData)
    .then(({ data }) => {
      return data;
    });
};

export const getAllUsers = () => {
  return newsApi.get("/api/users").then(({ data }) => {
    return data;
  });
};

export const deleteCommentById = (comment_id) => {
  return newsApi.delete(`/api/comments/${comment_id}`).then(({ data }) => {
    return data;
  });
};

export const getAllTopics = () => {
  return newsApi.get("/api/topics").then(({ data }) => {
    return data;
  });
};

export const getArticlesByTopic = (topic) => {
  return newsApi.get(`/api/articles/?topic=${topic}`).then(({ data }) => {
    return data;
  });
};

export const getArticlesBySearch = ( sort_by = 'created_at', order = 'desc',topic) => {
  if (topic){
    return newsApi.get(`/api/articles/?sort_by=${sort_by}&order=${order}&topic=${topic}`).then(({ data }) => {
      return data;
    });
  } else {
    return newsApi.get(`/api/articles/?sort_by=${sort_by}&order=${order}`).then(({ data }) => {
      return data;
    });
  }
 
};

