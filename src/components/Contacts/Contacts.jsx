import {
  Button,
  Input,
  Label,
  ContactItem,
} from 'components/ContactForm/ContactForm.styled';
import PropTypes from 'prop-types';

export const Contacts = ({ contacts, onFilterSearch, filter, setContacts }) => {
  const onDelete = name => {
    const updatedContacts = contacts.filter(
      contact => contact.name.toLowerCase() !== name.toLowerCase()
    );
    setContacts(updatedContacts);
    if (!updatedContacts) return;
    if (updatedContacts.length === 0) {
      return localStorage.removeItem('contacts');
    }
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const filtredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
  const list = filtredContacts.map(({ name, id, phone }) => (
    <ContactItem key={id}>
      {name}: {phone}{' '}
      <Button type="button" onClick={() => onDelete(name)}>
        Delete
      </Button>
    </ContactItem>
  ));
  return (
    <>
      <h2>Contacts</h2>
      <Label>
        Find contacts by name
        <Input
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={onFilterSearch}
          value={filter}
        />
      </Label>
      <ul>{list}</ul>
    </>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  setContacts: PropTypes.func.isRequired,
  onFilterSearch: PropTypes.func.isRequired,
};
