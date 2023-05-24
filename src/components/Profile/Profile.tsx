import React, { useState, useEffect } from 'react';

import css from '../../styles/Profile.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { createUser, toggleForm, toggleFormType, updateUser } from '../../features/user/userSlice';

const Profile = () => {
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
  const { currentUser } = useAppSelector(({ user }) => user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(currentUser);

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const isNotEmpty = Object.values(values).every((val) => val);

    // if (!isNotEmpty) return;

    dispatch(updateUser(values));
  };

  return (
    <section className={css.profile}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.group}>
            <input
              type='email'
              placeholder='Your email'
              name='email'
              value={values.email}
              onChange={handleChange}
              autoComplete='off'
              required
            />
          </div>
          <div className={css.group}>
            <input
              type='name'
              placeholder='Your name'
              name='name'
              value={values.name}
              onChange={handleChange}
              autoComplete='off'
              required
            />
          </div>
          <div className={css.group}>
            <input
              type='password'
              placeholder='Your password'
              name='password'
              value={values.password}
              onChange={handleChange}
              autoComplete='off'
              required
            />
          </div>
          <div className={css.group}>
            <input
              type='avatar'
              placeholder='Your avatar'
              name='avatar'
              value={values.avatar}
              onChange={handleChange}
              autoComplete='off'
              required
            />
          </div>

          <button type='submit' className={css.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
