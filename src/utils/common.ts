import { IProducts } from '../types/type';

export const shuffle = <T extends Iterable<IProducts>>(arr: T) =>
  [...arr].sort(() => 0.5 - Math.random());

export const buildUrl = (url: string, params: {}) => {
  // console.log(url);

  let urlWithParams = url;

  Object.entries(params).forEach(([key, value]) => {
    const sign = '&';
    urlWithParams += `${sign}${key}=${value}`;
  });

  return urlWithParams;
};

export const sumBuy = (arr: number[]) => arr.reduce((prev: number, cur: number) => prev + cur, 0);
