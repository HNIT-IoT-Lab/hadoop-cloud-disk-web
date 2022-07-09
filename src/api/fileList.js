import Axios from "axios";
import { get, post_json, dowmLoadFile } from "../utils/axios";

export function fetchData(params) {
  return get("file/fileList", params);
}

export function getById(params) {
  return get("file/selectOne", params);
}

export function update(params) {
  return post_json("file/update", params);
}

export function deleteById(id) {
  let url = "file/deleteOne?id=" + id;
  return post_json(url);
}

export function createDir(params) {
  return get("file/createDir?path=" + params);
}

export function uploadFile(params) {
  let url = "file/uploadFile";
  return post_json(url, params);
}

export function downLoadFile(params) {
  let url = "file/downLoadFile";
  return post_json(url, params);
}

/**
 1. 文件下载
 2. @param params 包括文件的路径名和文件的名字
 */
export function download(params) {
  let url = "file/downLoadFile";
  return dowmLoadFile(url, params);
}

export function deleteDir(params) {
  return get("file/deleteDir?path=" + params);
}

/**
 * 查询用户的分析日志
 */
export function queryLog() {
  return post_json("user/userLogAnalyse");
}
