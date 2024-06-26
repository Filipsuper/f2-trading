export const parse_symbol_name = (name: String) => {
  let parsed_name = name.split(" ")[0];

  let length = parsed_name.length;

  if (name.toLowerCase().includes("mini")) {
    return (
      name.split(" ")[2] + (name.toLowerCase().includes(" l ") ? " L" : "  S")
    );
  }
  if (length < 10) {
    return parsed_name;
  }

  let name_arr = Array.from(parsed_name);

  let test = [];

  test.push(name_arr[0]);
  test.push(name_arr[1]);
  test.push(name_arr[2]);
  test.push(name_arr[length - 3]);
  test.push(name_arr[length - 2]);
  test.push(name_arr[length - 1]);
  return test;
};

// make a function that rounds a float to two decimals
export const round_to_two_decimals = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

// make a function that that conditionally renders a react component
export const conditional_render = (
  condition: boolean,
  component: any,
  otherwise: any
) => {
  if (condition) {
    return component;
  } else {
    return otherwise ? otherwise : null;
  }
};
