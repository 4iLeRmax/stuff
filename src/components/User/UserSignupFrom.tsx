import React, { useState, FC } from 'react';

import css from '../../styles/User.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { createUser, toggleFormType } from '../../features/user/userSlice';

interface UserSignupFromProps {
  closeForm: () => void;
}

const UserSignupFrom: FC<UserSignupFromProps> = ({ closeForm }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const isNotEmpty = Object.values(values).every((val) => val);

    // if (!isNotEmpty) return;

    dispatch(createUser(values));
    closeForm();
  };

  return (
    <div className={css.wrapper}>
      <div className={css.close} onClick={closeForm}>
        <AiOutlineClose />
      </div>

      <div className={css.title}>Sing Up</div>

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

        <div className={css.link} onClick={() => dispatch(toggleFormType('login'))}>
          I already have an account
        </div>

        <button type='submit' className={css.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignupFrom;
