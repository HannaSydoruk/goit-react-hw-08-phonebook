import { PulseLoader } from 'react-spinners';
import css from './ContactListItem.module.css';
import { useSelector } from 'react-redux';
import { selectContactIsRemoving } from '../../redux/contacts/contactsSliceSelectors';

export const ContactListItem = ({ contact, onDeleteHandler }) => {
  const isRemovindContact = useSelector(selectContactIsRemoving);

  return (
    <li className={css['contact-list']}>
      <span className={css.name}>{contact.name}</span>
      <span className={css.phone}>
        {contact.number}
        <button
          className={css['delete-btn']}
          onClick={() => onDeleteHandler(contact.id)}
          disabled={isRemovindContact}
        >
          Delete
          {isRemovindContact && <PulseLoader color="#ffffff" size={3} />}
        </button>
      </span>
    </li>
  );
};
