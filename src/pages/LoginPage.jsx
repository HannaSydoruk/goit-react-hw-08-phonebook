import { useDispatch, useSelector } from 'react-redux';
import { apiLoginUser } from '../redux/auth/authSlice';
import { selectIsLoading } from '../redux/auth/authSlice.selectors';
import { Bounce, toast } from 'react-toastify';
import css from './PagesStyles.module.css';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const onSubmit = e => {
    e.preventDefault();
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;

    const formData = {
      email,
      password,
    };

    dispatch(apiLoginUser(formData))
      .unwrap()
      .catch(() => {
        toast.error(`Wrong login or password`, {
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
      <h2>Enter you login and password</h2>
      <form onSubmit={onSubmit} className={css.form}>
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
          Sign In
        </button>
      </form>
    </div>
  );
};
