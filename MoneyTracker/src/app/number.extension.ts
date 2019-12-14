export {};

declare global {
  // this is important to access it as global type Number

  interface Number {
    roundTo2Places(): number;
  }
}

Number.prototype.roundTo2Places = function(): number {
  return Math.round(this * 100)/100;
};
