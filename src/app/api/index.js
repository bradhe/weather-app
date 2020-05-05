import axios from 'axios';

class ApiClient {
  constructor(opts) {
    this.axios = axios.create({
      baseURL: opts.baseURL,
      timeout: 60000,
    });
    this.options = opts;
  }

  get(path, data={}) {
    return new Promise((resolve, reject) => {
      this.axios.get(path, { params: data }).then(res => {
        resolve(res.data, res);
      })
    });
  }

  post(path, data={}) {
    return new Promise((resolve, reject) => {
      this.axios.post(path, data).then(res => {
        resolve(res.data, res);
      })
    });
  }

  put(path, data={}) {
    return new Promise((resolve, reject) => {
      this.axios.put(path, data).then(res => {
        resolve(res.data, res);
      })
    });
  }
};

export const api = new ApiClient({ baseURL: '/' });
