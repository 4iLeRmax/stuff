// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ICategories, IProducts } from '../../types/type';
// import Products from '../Products/Products';
// import Categories from './Categories';

// const Category = () => {
//   const { id } = useParams();
//   const [title, setTitle] = useState('');

//   // useEffect(()=>{

//   // }, []);

// const { data: products } = useQuery(
//   ['products', id],
//   async () => await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`),
//   {
//     select: <T extends { data: IProducts[] | undefined }>(products: T) => products.data,
//     enabled: !!id,
//   },
// );

//   const { data: categories } = useQuery(
//     ['categories'],
//     async () => await axios.get('https://api.escuelajs.co/api/v1/categories'),
//     {
//       select: (categories) =>
//         categories.data.filter(<T extends ICategories>(obj: T) => obj.id <= 5),
//     },
//   );

//   // console.log(id);
//   // useEffect(() => {
//   //   setTitle(
//   //     id &&
//   //       categories &&
//   //       categories.filter(<T extends ICategories>(c: T) => c.id.toString() == id)[0].name,
//   //   );
//   // }, [id, categories]);

//   return (
//     <>
//       <Products products={products} title={title} />
//       <Categories products={categories} title='Worth seeing' />
//     </>
//   );
// };

// export default Category;

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ICategories, IProducts } from '../../types/type';
import Products from '../Products/Products';

import { buildUrl } from '../../utils/common';
import { BASE_URL } from '../../utils/constants';

import css from '../../styles/Category.module.css';

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const defaultParams = {
    title: '',
    price_min: 0,
    price_max: 0,
    limit: 5,
    offset: 0,
    // categoryId: id,
  };

  const [params, setParams] = useState(defaultParams);
  const [title, setTitle] = useState('');
  // const [length, setLength] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  // const [items, setItems] = useState([]);

  const {
    data: products,
    refetch,
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery(
    ['products', id],
    async () => await axios.get(buildUrl(`${BASE_URL}/products/?categoryId=${id}`, params)),
    {
      select: <T extends { data: IProducts[] | undefined }>(products: T) => products.data,
      enabled: !!id,
    },
  );

  // console.log(buildUrl(`${BASE_URL}/products/?categoryId=${id}`, params));
  // console.log(products && Math.ceil(products.length / 10));

  const { data: categories } = useQuery(
    ['categories'],
    async () => await axios.get('https://api.escuelajs.co/api/v1/categories'),
    {
      select: (categories) =>
        categories.data.filter(<T extends ICategories>(obj: T) => obj.id <= 5),
    },
  );

  useEffect(() => {
    if (!id || !categories?.length) return;
    // setTitle(categories.find((item: any) => item.id == id).name);
    setTitle(categories.filter(<T extends ICategories>(c: T) => c.id.toString() == id)[0].name);
    refetch();
  }, [id, categories]);

  useEffect(() => {
    setHasMore(true);
    setParams(defaultParams);
  }, [id]);

  // useEffect(() => {
  //   // console.log(products);
  //   console.log(products?.length);
  //   length === products?.length ? console.log('stop') : console.log('cont')
  //   setLength(products?.length)

  // }, [isFetching]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setParams({ ...params, [e.target.name]: e.target.value });
    setTimeout(() => {
      refetch();
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    refetch();
  };

  const handleSeeMore = async () => {
    await setParams({ ...params, limit: params.limit + 5 });
    await refetch();

    if (products && products.length < params.limit) {
      setHasMore(false);
    }
  };

  return (
    <section className={css.wrapper}>
      <h2 className={css.title}>{title}</h2>

      <form className={css.filters} onSubmit={handleSubmit}>
        <div className={css.filter}>
          <input
            type='text'
            name='title'
            placeholder='Product name'
            onChange={handleChange}
            value={params.title}
          />
        </div>
        <div className={css.filter}>
          <input
            type='number'
            name='price_min'
            placeholder='0'
            onChange={handleChange}
            value={params.price_min}
          />
        </div>
        <div className={css.filter}>
          <input
            type='number'
            name='price_max'
            placeholder='0'
            onChange={handleChange}
            value={params.price_max}
          />
        </div>

        <button type='submit' hidden></button>
      </form>
      {isLoading ? (
        <div className='preloader'>Loading...</div>
      ) : !isSuccess || !products?.length ? (
        <div className={css.back}>
          <span>No results</span>
          <button onClick={() => navigate('/')}>Reset</button>
        </div>
      ) : (
        products && <Products products={products} style={{ padding: 0 }} />
      )}

      {hasMore && (
        <div className={css.more}>
          <button onClick={handleSeeMore}>{isFetching ? 'Loading...' : 'See more'}</button>
        </div>
      )}
    </section>
  );
};

export default Category;
