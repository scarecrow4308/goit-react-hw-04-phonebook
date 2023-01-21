import { ContactForm } from '../ContactForm/ContactForm';
import PropTypes from 'prop-types';

export const Phonebook = ({ contacts, setContacts }) => {
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} setContacts={setContacts} />
    </>
  );
};

Phonebook.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  setContacts: PropTypes.func.isRequired,
};
