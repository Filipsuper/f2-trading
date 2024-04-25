import axios from "axios";

const PROD_API = "https://trademaxxer.com/api";
const DEV_API = "http://127.0.0.1:5000";

// REMEMBER TO CHANGE API WHEN PRODDING
const API_URL = DEV_API;

axios.defaults.baseURL = API_URL;
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const get_user_data = async () => {
  return axios.get("/user").then((res) => res.data);
};

export const get_overview = async (setData, refresh) => {
  try {
    axios.get("/overview").then((res) => setData(res.data));
  } catch {
    refresh();
  }
};

export const remove_trade = async (trade_data, refresh) => {
  axios
    .post("/trades/delete", trade_data)
    .then((res) => {
      refresh();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

export const post_trade = async (trade_data, refresh) => {
  const { symbol, price, qty, isNew, size } = trade_data;

  const TARGET_STOP_PERCENTAGE = 0.1;

  let trade = {};

  if (isNew) {
    trade = {
      symbol: symbol,
      price: parseFloat(price),
      size: price * Number.parseInt(size / price),
      stop: price - price * TARGET_STOP_PERCENTAGE,
      target: parseFloat(price) + price * TARGET_STOP_PERCENTAGE,
      type: "buy",
      closed: false,
    };
  }
  axios
    .post("/trades/add", trade)
    .then((res) => {
      refresh();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

export const update_trade = async (trade_data, refresh) => {
  const { symbol, price, qty, isNew, stop, target, trade_id, notes } =
    trade_data;

  const TARGET_STOP_PERCENTAGE = 0.1;
  let trade = {};
  if (notes != undefined) {
    trade = {
      symbol: symbol,
      trade_id: trade_id,
      notes: notes,
      stop: stop,
      target: target,
    };
  } else {
    trade = {
      symbol: symbol,
      price: price,
      size: qty * price,
      type: "buy",
      trade_id: trade_id,
      stop: stop,
      target: target,
    };
  }
  axios
    .post("/trades/update", trade)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res; // Fixed to correctly call the method
    })
    .then((json) => {
      refresh();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

export const close_trade = async (trade, refresh) => {
  axios
    .post("/trades/close", trade)
    .then((res) => res.data)
    .then(() => refresh());
};

export const get_trades = async (setData) => {
  axios.get("/trades").then((res) => setData(res.data));
};

export const get_prices = async (setData) => {
  axios.get("/stock_prices").then((res) => setData(res.data));
};

export const get_graph_data = async (setData) => {
  axios.get("/graph_data").then((res) => setData(res.data));
};

export const post_login = async (data, refresh) => {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
export const create_account = async (data, refresh) => {
  return axios.post("/user/add", data).then((res) => res.data);
};
