import { fetchApi } from "../utils";

const auth = () => fetchApi("/auth/admin", "GET");

const adminLogin = ({ account, password }) =>
  fetchApi("/auth/admin", "POST", { account, password });

export default {
  auth,
  adminLogin
};
