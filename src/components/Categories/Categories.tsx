import { FC } from 'react';
import { Link } from 'react-router-dom';

import css from '../../styles/Categories.module.css';
import { ICategories } from '../../types/type';

interface CategoriesProps {
  title?: string;
  products: ICategories[]; //======================
}

const Categories: FC<CategoriesProps> = ({ title, products }) => {
  // const list = products?.filter((_, i) => i < amount);
  // console.log({products});

  return (
    <section className={css.section}>
      <h2>{title}</h2>

      <div className={css.list}>
        {products?.map(({ id, name, image }) => (
          <Link to={`/categories/${id}`} key={id} className={css.item}>
            <div className={css.image} style={{ backgroundImage: `url(${image})` }} />
            <h3 className={css.title}>{name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
