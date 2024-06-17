import { fetch_nasdaq_data } from "./tools";

const calculateAveragePrice = (existingTrade, newTrade) => {
  const existingSize = parseFloat(existingTrade.size);
  const existingPrice = parseFloat(existingTrade.price);
  const newSize = parseFloat(newTrade.size);
  const newPrice = parseFloat(newTrade.price);

  const existingQty = existingSize / existingPrice;
  const newQty = newSize / newPrice;

  const averagePrice =
    (existingPrice * existingQty + newPrice * newQty) / (existingQty + newQty);

  return parseFloat(averagePrice.toFixed(10));
};

const check_match = (arr, check_element) => {
  let name = "";

  arr.forEach((elem) => {
    let name_lower = elem.name.toLowerCase();

    if (
      name_lower.includes(check_element.toLowerCase()) &&
      elem.country == "United States"
    ) {
      name = elem.symbol;
    }
  });

  return name;
};

const parse_trades = async (trades: Array, user_stop, user_target) => {
  const new_trades = [];
  let exit_index = 0;

  const NASDAQ_API =
    "api/screener/stocks?tableonly=true&limit=25&offset=0&download=true";

  const nasdaq_data = await fetch_nasdaq_data(NASDAQ_API);

  trades.forEach((trade) => {
    let symbol = trade["Värdepapper/beskrivning"].toString();
    const date = trade["Datum"];
    // const size = parseFloat(trade["Belopp"]);
    let price = parseFloat(trade["Kurs"]);
    const qty = parseInt(trade["Antal"]);
    const currency = parseInt(trade["Valuta"]);
    const typ = trade["Typ av transaktion"];

    const use_qty = Math.abs(qty);

    let parsed_symbol = check_match(nasdaq_data.data.rows, symbol);

    if (parsed_symbol.length > 1) {
      price = price * 10.6;
      symbol = parsed_symbol;
      // size = price * use_qty * 10.6;
    }

    // Check if trade is new
    let isNew = true;
    let trade_index = 0;
    new_trades.forEach((elem, idx) => {
      if (symbol == elem.symbol && elem.closed == false) {
        isNew = false;
        trade_index = idx;
      }
    });

    let load = {
      closed: false,
      symbol: symbol,
      date: date,
      price: price,
      size: use_qty * price,
      exit: [],
      stop: price - price * (user_stop / 100),
      target: price + price * (user_target / 100),
      initial_size: price * use_qty,
      type: "buy",
      pnl: 0,
    };

    // console.log(trade_data);

    if (isNew) {
      if (typ == "Sälj") {
        return;
      }
      if (typ == "Köp") {
        new_trades.push(load);
      }
    } else if (typ == "Sälj") {
      // HANDLE SELL

      let old_pnl = new_trades[trade_index].pnl;
      let old_exit = new_trades[trade_index].exit;
      let old_size = new_trades[trade_index].size;
      let old_price = new_trades[trade_index].price;

      let pnl = price * use_qty - new_trades[trade_index].price * use_qty;

      // FIXA DETTA
      let exit_data = {
        date: date,
        index: exit_index,
        pnl: pnl,
        price: price,
        quantity: use_qty,
      };

      exit_index += 1;

      //HANDLE DATA
      new_trades[trade_index].pnl = old_pnl + pnl;
      new_trades[trade_index].exit = [...old_exit, exit_data];

      new_trades[trade_index].size =
        old_price * (old_size / old_price - use_qty);

      // HANDLE SELL ALL
      if (new_trades[trade_index].size < 1) {
        new_trades[trade_index].closed = true;
        new_trades[trade_index].size = 0;
      }
    } else if (typ == "Köp") {
      // HANDLE BUY
      // let old_pnl = new_trades[trade_index].pnl;
      // let old_exit = new_trades[trade_index].exit;
      let old_size = new_trades[trade_index].size;
      let old_price = new_trades[trade_index].price;

      const existingTrade = { size: old_size, price: old_price };
      const newTrade = { size: price * use_qty, price: price };

      old_price = calculateAveragePrice(existingTrade, newTrade);
      old_size = old_size + price * use_qty;
    } else {
      return;
    }
  });

  return new_trades;
};

export const parse_avanza_data = async (
  data: String,
  user_stop,
  user_target
) => {
  let splitted_data = data.split("\n"); // Split rows

  let new_arr = splitted_data.map((elem) => {
    return elem.replace(",", ".").split(";"); // Split every ;
  });
  let header = new_arr[0];

  let new_data = [];
  new_arr = new_arr.filter((e, idx) => idx != 0); // REMOVE HEADER
  new_arr.forEach((trade) => {
    let obj = {};
    trade.forEach((trade_element, idx) => {
      obj[header[idx]] = trade_element;
    });
    new_data.push(obj);
  });

  new_data.reverse();
  new_data = new_data.filter((e, idx) => idx != 0); // REMOVE EMTPY
  return await parse_trades(new_data, user_stop, user_target);
};

// export const parse_csv_data = (data) => {
//   let splitted_data = data.split("\n"); // Split rows

//   let new_arr = splitted_data.map((elem) => {
//     return elem.replace(",", ".").split(";"); // Split every ;
//   });
//   let header = new_arr[0];

//   let new_data = [];
//   new_arr = new_arr.filter((e, idx) => idx != 0); // REMOVE HEADER
//   new_arr.forEach((trade) => {
//     let obj = {};
//     trade.forEach((trade_element, idx) => {
//       obj[header[idx]] = trade_element;
//     });
//     new_data.push(obj);
//   });

//   return new_data;
// };
