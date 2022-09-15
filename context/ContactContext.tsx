import { createContext, useEffect, useState } from "react";
import client from "../apollo-client";
import { GET_CONTACT_LIST } from "../graphql/query";
import { Contact } from "../interfaces/contact";

type ContactContextProps = {
  children: React.ReactNode;
};

let contact: Contact[] = [];

export const ContactContext = createContext(contact);

export const ContactContextProvider = ({
  children,
}: ContactContextProps) => {
  const [contactAPI, setContactAPI] = useState<Contact[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // fetch data from GET_CONTACT_LIST using useEffect
  useEffect(() => {
    client
      .query({
        query: GET_CONTACT_LIST,
      })
      .then((res) => {
        setContactAPI(res.data.contact);
      });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tempContact = JSON.parse(
        localStorage.getItem("contactList") || "[]",
      );
      if (tempContact.length > 0) {
        setContacts(tempContact);
      } else {
        localStorage.setItem("contactList", JSON.stringify([]));
      }
    }
  }, []);

  useEffect(() => {
    contact = contactAPI.map((element) => {
      const found: Contact | undefined = contacts.find(
        (element2) => element2.id === element.id,
      );
      if (found) {
        return found;
      }
      return { ...element, isFavorite: false };
    });
    setContacts(contact);
    localStorage.setItem("contactList", JSON.stringify(contact));
  }, [contactAPI]);

  return (
    <ContactContext.Provider value={contact}>
      {children}
    </ContactContext.Provider>
  );
};

export async function getStaticProps() {
  const data = await client.query({
    query: GET_CONTACT_LIST,
  });

  return {
    props: {
      data: data.data.contact,
    },
  };
}
