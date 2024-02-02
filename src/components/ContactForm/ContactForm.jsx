import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/contactsSlice';
import css from './ContactForm.module.css';
import {
  selectContactIsAdding,
  selectContactsItems,
} from '../../redux/contacts/contactsSliceSelectors';
import { PulseLoader } from 'react-spinners';
import { Bounce, toast } from 'react-toastify';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const formKey = { name: setName, number: setNumber };
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsItems);
  const isContactAdding = useSelector(selectContactIsAdding);

  const onChangeHandler = e => {
    const { name, value } = e.currentTarget;
    formKey[name](_ => value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    const hasDuplicates = contacts.some(
      contact => contact.name.toLowerCase() === name.toLocaleLowerCase()
    );
    if (hasDuplicates) {
      toast(`🦄 ${name} is already in contacts!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }
    const contact = {
      id: nanoid(),
      name: name,
      number: number.trim(),
    };

    const action = addContact(contact);
    dispatch(action)
      .unwrap()
      .then(() => {
        toast(`🦄 Contact ${contact.name} was added`, {
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
        reset();
      })
      .catch(e => {
        toast.error(`Contact ${contact.name} was not added: ${e}`, {
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
    <form onSubmit={formSubmitHandler} className={css['form-input']}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChangeHandler}
        placeholder="Name"
        id={nanoid()}
        required
      />
      <input
        type="tel"
        name="number"
        value={number}
        onChange={onChangeHandler}
        placeholder="Phone"
        id={nanoid()}
        required
      />
      <button
        type="submit"
        className={css['form-button']}
        disabled={isContactAdding}
      >
        {isContactAdding ? <PulseLoader color="#ffffff" size={3} /> : <>✔</>}
      </button>
    </form>
  );
};
