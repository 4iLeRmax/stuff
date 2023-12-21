
import BG from '../../images/computer.png';

import css from '../../styles/Home.module.css';

const Poster = () => {
  return (
    <section className={css.home}>
      <div className={css.title}>BiG SALE 20%</div>
      <div className={css.product}>
        <div className={css.text}>
          <div className={css.subtitle}>the bestseller of 2022</div>
          <h1 className={css.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
          <button className={css.button}>Shop Now</button>
        </div>
        <div className={css.image}>
          <img src={BG} alt="computer" />
        </div>
      </div>
    </section>
  );
};

export default Poster;
