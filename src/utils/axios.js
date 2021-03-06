import { getToken } from "@/utils/auth";
import Axios from "axios";
import qs from "qs";

// export const mybaseUrl = "http://localhost:8080/api";
export const mybaseUrl = "https://hadoop.fengxianhub.top/api";
// 全局配置
export const myAxios = Axios.create({
  baseURL: mybaseUrl, // 请求的路径
  // baseURL: "http://hadoop1004/api/", // 请求的路径
  timeout: 5000, // 超时时间
});

// 带token
myAxios.defaults.headers.common["token"] = getToken();

// 响应接手前的拦截
myAxios.interceptors.response.use(
  function (response) {
    // 将数据进行封装
    let { data } = response;
    response.data = data.data;
    response.code = data.code;
    response.message = data.message;

    // 统一异常处理
    if (data.code !== 200) {
      return Promise.reject(data.message);
    }
    return response;
  },
  function (err) {
    return Promise.reject(err);
  }
);

/**
 * get方法
 */
export function get(url, params) {
  return myAxios({
    method: "get",
    url,
    params,
    timeout: 10000,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
}

/**
 * post方法
 */
export function post_json(url, data) {
  return myAxios({
    method: "post",
    url,
    data,
    timeout: 10000,
  });
}

/**
 * 下载文件
 */
export const dowmLoadFile = (url, params) => {
  let fileName = params.fileName;
  return new Promise((resolve, reject) => {
    Axios.request({
      method: "post",
      baseURL: mybaseUrl,
      url: url,
      params: {
        fileName: params.fileName,
        relativePath: params.relativePath,
      },
      headers: {
        token: getToken(),
      },
      responseType: "blob",
    })
      .then((res) => {
        const blob = new Blob([res.data]);
        const link = document.createElement("a");
        link.download = fileName; // 给下载的文件一个名字
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const config = {
  headers: {
    "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
  },
};

export function uploadFile(url, data) {
  return myAxios.post(url, data, config);
}
