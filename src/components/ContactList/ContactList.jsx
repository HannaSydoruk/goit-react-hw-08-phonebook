import { ContactListItem } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAll } from '../../redux/contacts/contactsSlice';
import css from './ContactList.module.css';
import { useEffect } from 'react';
import {
  selectContactsIsLoading,
  selectFilteredContacts,
} from '../../redux/contacts/contactsSliceSelectors';
import { PulseLoader } from 'react-spinners';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectContactsIsLoading);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <PulseLoader color="rgb(39, 100, 79)" size={5} />
      ) : (
        <ul className={css.contactlist}>
          {filteredContacts.map(contact => {
            return <ContactListItem contact={contact} key={contact.id} />;
          })}
        </ul>
      )}
    </>
  );
};
