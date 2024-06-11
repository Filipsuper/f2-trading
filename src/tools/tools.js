import axios from "axios";

const PROD_API = "https://trademaxxer.com/api";
const DEV_API = "http://127.0.0.1:9091/api";

// REMEMBER TO CHANGE API WHEN PRODDING
const API_URL = PROD_API;

axios.defaults.baseURL = API_URL;
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const get_data = async (url) => {
  let response = await axios.get(url);
  let data = response.data;
  return await data;
};

const post_data = async (url, post_data) => {
  let response = await axios.post(url, post_data);
  let data = response.data;
  return await data;
};

export const remove_trade = async (trade_data, refresh) => {
  try {
    let data = await post_data("/trades/delete", trade_data).then(() =>
      refresh()
    );
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const post_trade = async (trade_data, refresh) => {
  const { symbol, price, qty, isNew, size, target, stop, setup } = trade_data;

  const TARGET_STOP_PERCENTAGE = 0.1;

  //Handle trade with and without target
  let trade_target = target
    ? target
    : parseFloat(price) + price * TARGET_STOP_PERCENTAGE;
  let trade_stop = stop ? stop : price - price * TARGET_STOP_PERCENTAGE;

  let trade = {};

  if (isNew) {
    trade = {
      symbol: symbol,
      setup: setup,
      price: parseFloat(price),
      size: price * Number.parseInt(size / price),
      stop: parseFloat(trade_stop),
      target: parseFloat(trade_target),
      type: "buy",
      closed: false,
    };
  }
  try {
    return post_data("/trades/add", trade)
      .then(() => refresh())
      .then(() => "Bought " + qty + " stocks!");
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const update_trade = async (trade_data, refresh) => {
  const { symbol, price, qty, isNew, stop, target, trade_id, notes, isFast } =
    trade_data;

  //VALIDATE
  if (qty < 1 || price < 0) return "Can not buy less than 1";

  const TARGET_STOP_PERCENTAGE = 0.1;
  //INSTANTIATE TRADE
  let trade = {};
  if (isFast) {
    // IF ITEM FAST ADD THEN STOP AND TARGET WONT BE SENT, ONLY PRICE DATA
    trade = {
      symbol: symbol,
      trade_id: trade_id,
      price: price,
      size: price,
    };
  } else if (notes != undefined) {
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
  try {
    return post_data("/trades/update", trade)
      .then(() => refresh())
      .then(() => "Bought " + qty + " stocks!");
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const close_trade = async (trade, refresh, qty) => {
  // Handle validation
  if (trade.quantity < 1 || trade.price < 1) return "Can not sell less than 1";
  if (trade.quantity > qty) return "Quantity too large!";

  return post_data("/trades/close", trade)
    .then(() => refresh())
    .then(() => {
      return "Sold " + trade.quantity + " stocks!";
    });
};

export const get_set_data = async (url, setData, query) => {
  let query_url = "";
  if (query != undefined) query_url = query;
  get_data(url + query_url).then((res) => setData(res));
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

// const parse_graph_data = (trades: Array) => {};
