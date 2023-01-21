import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import contactList from '../data/contacts.json';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');

    if (localContacts) {
      setContacts(JSON.parse(localContacts));
      return;
    }
    setContacts(contactList);
    return;
  }, []);

  const onFilterSearch = e => {
    setFilter(e.target.value);
    contacts.filter(
      contact => contact.name.toLowerCase() === e.target.value.toLowerCase()
    );
  };

  return (
    <Container>
      <Phonebook contacts={contacts} setContacts={setContacts} />
      <Contacts
        setContacts={setContacts}
        contacts={contacts}
        onFilterSearch={onFilterSearch}
        filter={filter}
      />
    </Container>
  );
};
