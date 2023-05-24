import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { BASE_URL } from '../../utils/constants';
import { ROUTES } from '../../utils/routes';

import { IProducts } from '../../types/type';

import Product from './Product';
import Products from './Products';
import { shuffle } from '../../utils/common';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useQuery(['product'], async () => await axios.get(`${BASE_URL}/products/${id}`), {
    select: <T extends { data: IProducts }>(product: T) => product.data,
  });

  console.log(!!product);
  const { data: related } = useQuery(
    ['related'],
    async () => await axios.get(`${BASE_URL}/products/`),
    {
      select: (related) => {
        const filtered = related.data.filter(
          <T extends IProducts>(obj: T) =>
            obj.category.id === product?.category.id && obj.id !== product.id,
        );
        return filtered;
      },
      enabled: !!product,
    },
  );
  // console.log(related);

  useEffect(() => {
    refetch();
  }, [id]);

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isSuccess, isFetching]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        product && (
          <Product
            images={product.images}
            description={product.description}
            title={product.title}
            price={product.price}
            product={product}
          />
        )
      )}
      {related && <Products products={related} title='Related' amount={5} />}
    </>
  );
};

export default SingleProduct;
