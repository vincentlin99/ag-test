export const log = v => console.log(v);
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const action = type => (payload = {}) => ({ type, ...payload });

export const createRequestTypes = base => {
  return {
    REQUEST: `${base}_REQUEST`,
    SUCCESS: `${base}_SUCCESS`,
    ERROR: `${base}_ERROR`
  };
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return response.json().then(function(json) {
    const error = new Error(response.status);
    error.response = json;
    throw error;
  });
};

const parseJSON = response => response.json();

const serialize = (obj, prefix) => {
  const str = [];
  let p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === "object"
          ? serialize(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v)
      );
    }
  }
  return str.join("&");
};

export const fetchApi = (uri, method, data = undefined, query = undefined) => {
  const options = {
    method,
    headers: {
      Accept: "application/json"
    }
  };

  const token = localStorage.getItem("ADMIN_TOKEN");

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (typeof data !== "undefined") {
    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }
  }
  let queryString = "";
  if (typeof query !== "undefined") {
    queryString = "?" + serialize(query);
  }
  return fetch(`/api${uri}${queryString}`, options)
    .then(checkStatus)
    .then(parseJSON);
};
