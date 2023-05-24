import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import UserSignupFrom from './UserSignupFrom';
import { toggleForm } from '../../features/user/userSlice';
import UserLoginForm from './UserLoginForm';
import css from '../../styles/User.module.css';

const UserForm = () => {
  const { showForm, formType } = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();

  const closeForm = () => {
    dispatch(toggleForm(false));
  };

  return (
    <>
      {showForm && (
        <>
          <div className={css.overlay} onClick={closeForm} />
          {formType === 'signup' ? (
            <UserSignupFrom closeForm={closeForm} />
          ) : (
            <UserLoginForm closeForm={closeForm} />
          )}
        </>
      )}
    </>
  );
};

export default UserForm;
