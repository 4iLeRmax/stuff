import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ROUTES } from '../../utils/routes';
import LOGO from '../../images/logo.svg';
import AVATAR from '../../images/avatar.jpg';
import { BASE_URL } from '../../utils/constants';
import { IProducts } from '../../types/type';

import { AiOutlineHeart } from 'react-icons/ai';
import { BsSearch, BsBag } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggleForm } from '../../features/user/userSlice';

import css from '../../styles/Header.module.css';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    avatar: '',
    role: '',
    id: 0,
    creationAt: '',
    updatedAt: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser, cart } = useAppSelector(({ user }) => user);

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const handleClick = () => {
    currentUser ? navigate(ROUTES.PROFILE) : dispatch(toggleForm(true));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const { data: productsSearch, isLoading } = useQuery(
    ['productsSearch'],
    async () => await axios.get(`${BASE_URL}/products?title=${searchValue}`),
    {
      select: <T extends { data: IProducts[] }>({ data }: T) => data,
      enabled: searchValue.length > 0,
    },
  );
  // console.log(productsSearch);

  return (
    <div className={css.header}>
      <div className={css.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt='Stuff' />
        </Link>
      </div>
      <div className={css.info}>
        <div className={css.user} onClick={handleClick}>
          {/* <div className={css.avatar} style={{ backgroundImage: `url(${currentUser ? currentUser.avatar : AVATAR})`}} /> */}
          <img src={currentUser ? values.avatar : AVATAR} className={css.avatar} />
          <div className={css.username}>{currentUser ? values.name : 'Guest'}</div>
        </div>
        {/* https://images.pexels.com/photos/16637188/pexels-photo-16637188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 */}

        <form className={css.form}>
          <div className={css.icon}>
            <BsSearch />
          </div>
          <div className={css.input}>
            <input
              type='search'
              name='search'
              placeholder='Search for anyting...'
              autoComplete='off'
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          {searchValue.length >= 1 && (
            <div className={css.box}>
              {isLoading
                ? 'Loading...'
                : !productsSearch?.length
                ? 'No results'
                : productsSearch?.map((product) => (
                    <Link
                      to={`/products/${product.id}`}
                      key={product.id}
                      className={css.item}
                      onClick={() => setSearchValue('')}
                    >
                      <div className={css.image}>
                        <img src={product.images[0]} />
                      </div>
                      <div className={css.title}>
                        {product.title}
                        <span>{product.category.name}</span>
                      </div>
                    </Link>
                  ))}
            </div>
          )}
        </form>

        <div className={css.account}>
          <Link to={ROUTES.HOME} className={css.favourites}>
            <div className={css['icon-fav']}>
              <AiOutlineHeart />
            </div>
          </Link>
          <Link to={ROUTES.CART} className={css.cart}>
            <div className={css['icon-cart']}>
              <BsBag />
            </div>
            {cart.length > 0 && <span className={css.count}>{cart.length}</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
