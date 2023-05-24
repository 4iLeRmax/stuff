import React from 'react';
import { Link } from 'react-router-dom';

import LOGO from '../../images/logo.svg';
import { ROUTES } from '../../utils/routes';
import { BsInstagram, BsFacebook, BsYoutube } from 'react-icons/bs';

import css from '../../styles/Footer.module.css';

const Footer = () => {
  return (
    <section className={css.footer}>
      <div className={css.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt='Stuff' />
        </Link>
      </div>

      <div className={css.rights}>Developed by me</div>
      <div className={css.socials}>
        <a href='#' target='_blank' rel='noreferrer'>
          <BsInstagram />
        </a>
        <a href='#' target='_blank' rel='noreferrer'>
          <BsFacebook />
        </a>
        <a href='#' target='_blank' rel='noreferrer'>
          <BsYoutube />
        </a>
      </div>
    </section>
  );
};

export default Footer;
