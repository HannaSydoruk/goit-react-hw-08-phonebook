import { useDispatch, useSelector } from 'react-redux';
import { apiRegisterUser } from '../redux/auth/authSlice';
import { selectIsLoading } from '../redux/auth/authSlice.selectors';
import { Bounce, toast } from 'react-toastify';
import css from './PagesStyles.module.css';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const onSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.userName.value;
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;

    const formData = {
      name,
      email,
      password,
    };

    dispatch(apiRegisterUser(formData))
      .unwrap()
      .then(() => {
        toast(`🦄 User ${name} registered`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      })
      .catch(e => {
        toast.error(`User ${name} registration failed: ${e}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      });
  };

  return (
    <div>
      <h2>RegisterPage</h2>
      <form onSubmit={onSubmit} className={css.form}>
        <label>
          Name:
          <br />
          <input
            type="text"
            name="userName"
            placeholder="Name"
            minLength={2}
            required
          />
        </label>
        <label>
          Email:
          <br />
          <input
            type="email"
            name="userEmail"
            placeholder="user@mail.com"
            required
          />
        </label>
        <label>
          Password:
          <br />
          <input
            type="password"
            name="userPassword"
            placeholder="**********"
            minLength={7}
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          Sign Up
        </button>
      </form>
    </div>
  );
};
