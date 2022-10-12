import {
  addNumberAndDoSomethingWithResult,
  addNumbers,
  divideNumbers,
  multiplyBy5,
  subtractNumbers,
} from ".";

describe("Tutorial functions", () => {
  it("Should add two numbers correctly", () => {
    let x = 5;
    let y = 10;

    const result = addNumbers(x, y);

    expect(result).toBe(15);
    expect(result).not.toBe(14);
  });

  it("Should subtract two numbers correctly", () => {
    let x = 5;
    let y = 10;

    const result = subtractNumbers(x, y);

    expect(result).toBe(-5);
    expect(result).not.toBe(14);
  });

  it("Should call the something function after adding the numbers", () => {
    const multiplyBy5Mock = jest.fn();

    addNumberAndDoSomethingWithResult(5, 10, multiplyBy5Mock);

    expect(multiplyBy5Mock).toHaveBeenCalled();
  });

  it("should multiply a number by 5", () => {
    expect(multiplyBy5(5)).toBe(25);
  });

  it("should divide two numbers", () => {
    expect(divideNumbers(5, 5)).toBe(1);
  });

  it("should return undefined if attempting to divide by zero", () => {
    expect(divideNumbers(5, 0)).toBe(Infinity);
  });
});
