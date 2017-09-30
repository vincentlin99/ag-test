import { fetchApi } from "../utils";

const get = q => fetchApi("/member", "GET");
const create = data => fetchApi("/member", "POST", data);

export default {
  get,
  create
};
