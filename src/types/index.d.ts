export {};
export {};
interface Btc {
  request: Function;
}

declare global {
  interface Window {
    btc: Btc;
  }
}
