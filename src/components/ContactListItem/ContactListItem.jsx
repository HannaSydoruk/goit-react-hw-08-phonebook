import { PulseLoader } from 'react-spinners';
import css from './ContactListItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectContactIsRemoving } from '../../redux/contacts/contactsSliceSelectors';
import { deleteContact } from '../../redux/contacts/contactsSlice';
import { useState } from 'react';

export const ContactListItem = ({ contact }) => {
  const isRemovindContact = useSelector(selectContactIsRemoving);
  const dispatch = useDispatch();
  const [removingContactId, setRemovingContactId] = useState(null);

  return (
    <li className={css['contact-list']}>
      <span className={css.name}>{contact.name}</span>
      <span className={css.phone}>
        {contact.number}
        <button
          className={css['delete-btn']}
          onClick={() => {
            setRemovingContactId(contact.id);
            dispatch(deleteContact(contact.id));
          }}
          disabled={isRemovindContact}
        >
          {isRemovindContact && removingContactId === contact.id ? (
            <PulseLoader color="#ffffff" size={3} />
          ) : (
            <>╳</>
          )}
        </button>
      </span>
    </li>
  );
};
