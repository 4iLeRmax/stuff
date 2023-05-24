import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Link } from 'react-router-dom';

import { cartItem, deleteProduct, toggleQuantity } from '../../features/user/userSlice';
import { sumBuy } from '../../utils/common';

import css from '../../styles/Cart.module.css';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(({ user }) => user);

  const changeQuantity = (item: cartItem, quantity: number) => {
    dispatch(toggleQuantity({ ...item, quantity: quantity }));
  };

  const removeItem = (item: cartItem) => {
    dispatch(deleteProduct(item));
  };

  return (
    <section className={css.cart}>
      <h2 className={css.title}>Your cart</h2>

      {!cart.length ? (
        <div className={css.empty}>Here is empty</div>
      ) : (
        <>
          <div className={css.list}>
            {cart.map((item) => {
              const { title, category, images, price, id, quantity } = item;

              return (
                <div className={css.item} key={id}>
                  <Link
                    to={`/products/${id}`}
                    className={css.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={css.info}>
                    <h3 className={css.name}>{title}</h3>
                    <div className={css.category}>{category.name}</div>
                  </div>

                  <div className={css.price}>{price}$</div>

                  <div className={css.quantity}>
                    <div
                      className={css.minus}
                      onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}
                    >
                      -
                    </div>

                    <span>{quantity}</span>

                    <div
                      className={css.plus}
                      onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}
                    >
                      +
                    </div>
                  </div>

                  <div className={css.total}>{price * quantity}$</div>

                  <div className={css.close} onClick={() => removeItem(item)}>
                    x
                  </div>
                </div>
              );
            })}
          </div>

          <div className={css.actions}>
            <div className={css.total}>
              TOTAL PRICE:{' '}
              <span>{sumBuy(cart.map(({ quantity, price }) => quantity * price))}$</span>
            </div>

            <button className={css.proceed}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
