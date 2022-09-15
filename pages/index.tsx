import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import tw from "twin.macro";
import SearchBar from "../components/SearchBar";
import ContactList from "../components/Contact";
import Pagination from "../components/Pagination";
import AddContactButton from "../components/AddContactButton";
import { Contact } from "../interfaces/contact";
import { ContactContext } from "../context/ContactContext";

const Home: NextPage = () => {
  const defaultData = useContext(ContactContext);

  const [input, setInput] = useState("");
  const [dataContact, setDataContact] = useState<Contact[]>(defaultData);
  useEffect(() => {
    setDataContact(defaultData);
  }, [defaultData]);

  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10);

  const indexOfLastPost = currentPage * contactsPerPage;
  const indexOfFirstPost = indexOfLastPost - contactsPerPage;
  const currentContacts = dataContact
    .filter((element) => !element.isFavorite)
    .slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  useEffect(() => {
    if (input) {
      const filteredData = dataContact.filter(
        (contact) =>
          contact.first_name.toLowerCase().includes(input.toLowerCase()) ||
          contact.last_name.toLowerCase().includes(input.toLowerCase()),
      );
      setDataContact(filteredData);
      return;
    }
    setDataContact(defaultData);
  }, [input]);

  const styles = {
    container: ({ hasBackground }: { hasBackground: boolean }) => [
      tw`min-h-screen max-w-6xl mx-auto`,
    ],
    header: tw`flex flex-col gap-y-5 md:flex-row md:justify-between md:items-center px-7 py-5`,
    main: tw`px-7`,
    title: tw`text-3xl font-semibold text-[#03AC0E]`,
    subtitle: tw`text-xl font-medium text-gray-500 mb-2`,
  };

  return (
    <div css={styles.container({ hasBackground: true })}>
      <Head>
        <title>PhoneBook</title>
        <meta
          name="description"
          content="Tokopedia Assignment that user can see list of contact, add, edit, and delete contact"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header css={styles.header}>
        <h1 css={styles.title}>PhoneBook</h1>
        <SearchBar input={input} setInput={setInput} />
      </header>

      <main css={styles.main}>
        <div tw="mb-4">
          <h2 css={styles.subtitle}>{`Favorites (${
            dataContact.filter((element) => element.isFavorite).length
          })`}</h2>
          <ContactList
            data={dataContact.filter((element) => element.isFavorite)}
          />
        </div>
        <div tw="mb-4">
          <h2 css={styles.subtitle}>{`Contacts (${
            dataContact.filter((element) => !element.isFavorite).length
          })`}</h2>
          <ContactList data={currentContacts} />
          <Pagination
            contactsPerPage={contactsPerPage}
            totalContacts={
              dataContact.filter((element) => !element.isFavorite).length
            }
            paginateBack={paginateBack}
            paginateFront={paginateFront}
            currentPage={currentPage}
          />
        </div>
        <AddContactButton />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
