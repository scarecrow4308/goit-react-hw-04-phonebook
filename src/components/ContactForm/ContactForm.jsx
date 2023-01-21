import { useEffect, useState } from 'react';
import { Form, Label, Input, Button } from './ContactForm.styled';
import PropTypes from 'prop-types';

export const ContactForm = ({ contacts, setContacts }) => {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const { name, number } = e.target.elements;
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.value.toLowerCase()
    );

    if (existingContact) {
      alert(`${name.value} is already in contacts!`);
      number.value = '';
      name.value = '';
      return;
    }

    const obj = {
      id: Date.now(),
      name: name.value,
      phone: Number(number.value),
    };

    const contactsList = [...contacts, obj];
    setContacts(contactsList);

    const localContacts = JSON.stringify(contactsList);
    localStorage.setItem('contacts', `${localContacts}`);

    setName(name.value);
    setTel(number.value);

    number.value = '';
    name.value = '';
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name:
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Tel:
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  setContacts: PropTypes.func.isRequired,
};
