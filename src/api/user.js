import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    params: { username: data.username, password: data.password },
  });
}

export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    params: { username: data.username, password: data.password },
  });
}

export function getInfo(token) {
  return request({
    url: "/user/getInfo",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}
