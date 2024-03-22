const API_URL = "http://127.0.0.1:5000";

export const get_overview = async (setData) => {
  try {
    fetch(`${API_URL}/api/overview`)
      .then((res) => res.json())
      .then((json) => setData(json));
  } catch {
    setData((old) => old + 1);
  }
};

export const post_trade = async (trade_data, refresh) => {
  const { symbol, price, qty, isNew } = trade_data;

  const TARGET_STOP_PERCENTAGE = 0.1;

  let trade = {};

  if (isNew) {
    trade = {
      symbol: symbol,
      price: price,
      size: price * Number.parseInt(5000 / price),
      stop: price - price * TARGET_STOP_PERCENTAGE,
      target: Number(price) + price * TARGET_STOP_PERCENTAGE,
      type: "buy",
      closed: false,
    };
  } else {
    trade = {
      symbol: symbol,
      price: price,
      size: qty * price,
      stop: price - price * TARGET_STOP_PERCENTAGE,
      target: Number(price) + price * TARGET_STOP_PERCENTAGE,
      type: "buy",
      closed: false,
    };
  }

  fetch(`${API_URL}/api/trades/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trade),
  })
    .then((res) => res.json)
    .then((json) => refresh((old) => old + 1));
};

export const close_trade = async (trade, refresh) => {
  fetch(`${API_URL}/api/trades/close`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trade),
  })
    .then((res) => res.json)
    .then((json) => refresh((old) => old + 1));
};

export const get_trades = async (setData) => {
  fetch(`${API_URL}/api/trades`)
    .then((res) => res.json())
    .then((json) => setData(json));
};

export const get_prices = async (setData) => {
  fetch(`${API_URL}/api/stock_prices`)
    .then((res) => res.json())
    .then((json) => setData(json));
};
