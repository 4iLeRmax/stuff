import { FC } from 'react';
import { Link } from 'react-router-dom';

import css from '../../styles/Products.module.css';
import { IProducts } from '../../types/type';

interface ProductsProps {
  title?: string;
  products: IProducts[] | undefined;
  style?: {};
  amount?: number;
}

const Products: FC<ProductsProps> = ({ title, products, amount, style }) => {
  const list = amount ? products?.filter((_, i) => i < amount) : products;

  // console.log(list);

  return (
    <section className={css.products} style={style}>
      {title && <h2>{title}</h2>}

      <div className={css.list}>
        {list?.map(({ id, images, title, category: { name: cat }, price }) => (
          <Link to={`/products/${id}`} key={id} className={css.product}>
            <div className={css.image} style={{ backgroundImage: `url(${images[0]})` }} />

            <div className={css.wrapper}>
              <h3 className={css.title}>{title}</h3>
              <div className={css.cat}>{cat}</div>
              <div className={css.info}>
                <div className={css.prices}>
                  <div className={css.price}>{price}$</div>
                  <div className={css.oldPrice}>
                    {Math.floor(price * 0.8) === 0 ? '1' : Math.floor(price * 0.8)}$
                  </div>
                </div>

                <div className={css.purchases}>{Math.floor(Math.random() * 20 + 1)} purchased</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
