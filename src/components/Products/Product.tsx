import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/reduxHooks';

import { ROUTES } from '../../utils/routes';
import { IProducts } from '../../types/type';

import css from '../../styles/Product.module.css';
import { addItemToCart } from '../../features/user/userSlice';

interface ProductProps {
  images: string[];
  title: string;
  price: number;
  description: string;
  product: IProducts;
}

const SIZES = [4, 4.5, 5];

const Product: FC<ProductProps> = ({ images, title, price, description, product }) => {
  const [currentImage, setCurrentImage] = useState('');
  const [currentSize, setCurrentSize] = useState(0);

  const dispatch = useAppDispatch();
  // const { cart } = useAppSelector(({ user }) => user);

  // console.log(cart);

  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);

  const AddToCart = () => {
    dispatch(addItemToCart(product));
  };

  return (
    <section className={css.product}>
      <div className={css.images}>
        <div className={css.current} style={{ backgroundImage: `url(${currentImage})` }} />
        <div className={css['images-list']}>
          {images.map((image, i) => (
            <div
              key={i}
              className={css.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={css.info}>
        <h1 className={css.title}>{title}</h1>
        <div className={css.price}>{price}$</div>
        <div className={css.color}>
          <span>Color:</span> Green
        </div>
        <div className={css.sizes}>
          <span>Sizes:</span>

          <div className={css.list}>
            {SIZES.map((size) => (
              <div
                onClick={() => setCurrentSize(size)}
                className={`${css.size} ${currentSize === size ? css.active : ''}`}
                key={size}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={css.description}>{description}</p>

        <div className={css.actions}>
          <button onClick={AddToCart} className={css.add} disabled={!currentSize}>
            Add to cart
          </button>
          <button className={css.favourite}>Add to favourites</button>
        </div>

        <div className={css.bottom}>
          <div className={css.purchase}>19 people purchased</div>

          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
