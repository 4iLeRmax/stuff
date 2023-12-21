import { NavLink } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ICategories } from '../../types/type';

import css from '../../styles/Sidebar.module.css';

const Sidebar = () => {
  // const { list } = useAppSelector(({ categories }) => categories);

  const { data: categories } = useQuery(
    ['categories'],
    async () => await axios.get('https://api.escuelajs.co/api/v1/categories'),
    {
      select: <T extends { data: ICategories[] }>(categories: T) =>
        categories.data.filter((obj) => obj.id <= 5),
    },
  );
  // console.log(categories);

  return (
    <section className={css.sidebar}>
      <div className={css.title}>Categories</div>
      <nav>
        <ul className={css.menu}>
          {categories?.map(({ id, name }: { id: number; name: string }) => (
            <li key={id}>
              <NavLink
                to={`/categories/${id}`}
                className={({ isActive }) => `${css.link} ${isActive ? css.active : ''}`}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={css.footer}>
        <a href='/help' target='_blank' className={css.link}>
          Help
        </a>
        <a href='/help' target='_blank' className={css.link} style={{}}>
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
