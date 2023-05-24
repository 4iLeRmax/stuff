import React, { useState, FC } from 'react';

import css from '../../styles/User.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { loginUser, toggleFormType } from '../../features/user/userSlice';

interface UserSignupFromProps {
  closeForm: () => void;
}

const UserLoginForm: FC<UserSignupFromProps> = ({ closeForm }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const isNotEmpty = Object.values(values).every((val) => val);

    // if (!isNotEmpty) return;

    dispatch(loginUser(values));
    closeForm();
  };

  return (
    <div className={css.wrapper}>
      <div className={css.close} onClick={closeForm}>
        <AiOutlineClose />
      </div>

      <div className={css.title}>Login</div>

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
            type='password'
            placeholder='Your password'
            name='password'
            value={values.password}
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>

        <div className={css.link} onClick={() => dispatch(toggleFormType('signup'))}>
          Create an account
        </div>

        <button type='submit' className={css.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
