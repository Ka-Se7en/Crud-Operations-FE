import axiosInstance from './axios-instance';

const doGet = (endpoint, data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(endpoint, { params: data })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const doPost = (endpoint, data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(endpoint, data)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const doDelete = (endpoint, data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(endpoint, data)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const doPut = (endpoint, data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(endpoint, data)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export { doGet, doPost, doDelete, doPut };
