import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ICategories, IProducts } from '../../types/type';

import Poster from '../Poster/Poster';
import Products from '../Products/Products';
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner';

const Home: FC = () => {
  const { data: products } = useQuery(
    ['products'],
    async () => await axios.get('https://api.escuelajs.co/api/v1/products'),
    {
      select: (products) =>
        products.data.filter(<T extends IProducts>(obj: T) => obj.category.id <= 5),
    },
  );
  const { data: productsSort } = useQuery(
    ['productsSort'],
    async () => await axios.get('https://api.escuelajs.co/api/v1/products'),
    {
      select: (productsSort) =>
        productsSort.data.filter(
          <T extends IProducts>(obj: T) => obj.category.id <= 5 && obj.price < 100,
        ),
    },
  );
  const { data: categories } = useQuery(
    ['categories'],
    async () => await axios.get('https://api.escuelajs.co/api/v1/categories'),
    {
      select: (categories) =>
        categories.data.filter(<T extends ICategories>(obj: T) => obj.id <= 5),
    },
  );
  // console.log({ categories });

  return (
    <>
      <Poster />
      <Products products={products} title='Trending' amount={5} />
      <Categories products={categories} title='Worth seeing' />
      <Banner />
      <Products products={productsSort} title='Less then 100' amount={5} />
    </>
  );
};

export default Home;
