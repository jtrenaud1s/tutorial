
export const addNumbers = (x: number, y: number) => {
  return x + y;
};

export const subtractNumbers = (x: number, y: number) => {
  return x - y;
};

export const addNumberAndDoSomethingWithResult = (
  x: number,
  y: number,
  something: (x: number) => number
) => {
  return something(x + y);
};

export const multiplyBy5 = (x: number) => {
  return x * 5;
};

export const divideNumbers = (x: number, y: number) => {
  return x / y;
};