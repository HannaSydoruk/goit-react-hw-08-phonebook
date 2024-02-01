import { useDispatch, useSelector } from 'react-redux';
import { apiLoginUser } from '../redux/auth/authSlice';
import { selectIsLoading } from '../redux/auth/authSlice.selectors';

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

    dispatch(apiLoginUser(formData));
  };

  return (
    <div>
      <h1>LoginPage</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="userEmail"
            placeholder="user@mail.com"
            required
          />
        </label>
        <label>
          Password:
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
