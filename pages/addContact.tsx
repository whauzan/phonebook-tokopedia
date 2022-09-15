import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import tw from "twin.macro";
import { ContactContext } from "../context/ContactContext";
import useAddContact from "../hooks/useAddContact";
import useAddPhone from "../hooks/useAddPhone";

const AddContact = () => {
  const router = useRouter();
  const contactList = useContext(ContactContext);

  interface InputName {
    first_name: string;
    last_name: string;
  }

  interface InputPhone {
    phones: {
      number: string;
    }[];
  }

  const [inputName, setInputName] = useState<InputName>({
    first_name: "",
    last_name: "",
  });

  const [inputPhone, setInputPhone] = useState<InputPhone>({
    phones: [{ number: "" }],
  });

  const { addContact, loadingAddContact } = useAddContact();
  const { addPhone, loadingAddPhone } = useAddPhone();

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName({
      ...inputName,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    let contactId: number = 0;
    if (
      inputName.first_name !== "" &&
      inputName.last_name !== "" &&
      inputPhone.phones[0].number !== ""
    ) {
      if (
        !contactList.find(
          (contact) =>
            contact.first_name === inputName.first_name &&
            contact.last_name === inputName.last_name,
        )
      ) {
        if (
          inputName.first_name.match(/^[a-zA-Z]+$/) &&
          inputName.last_name.match(/^[a-zA-Z]+$/)
        ) {
          await addContact({
            variables: {
              first_name: inputName.first_name,
              last_name: inputName.last_name,
              created_at: new Date().toISOString(),
            },
          }).then((res) => {
            contactId = res.data?.insert_contact.returning[0].id!;
            addPhone({
              variables: {
                objects: inputPhone.phones.map((phone) => {
                  return {
                    number: phone.number,
                    contact_id: contactId,
                  };
                }),
              },
            });
          });
          await router.replace(`/${contactId}`);
        } else {
          alert("Please enter a valid name");
        }
      } else {
        alert("Contact already exist");
      }
    } else {
      alert("Please fill the form");
    }
  };

  const styles = {
    container: tw`min-h-screen max-w-6xl mx-auto pt-20 px-4 md:px-0 flex flex-col items-center`,
    card: tw`w-full max-w-2xl bg-white bg-opacity-10 rounded-lg shadow-lg py-2 px-4 mt-6`,
    title: tw`text-sm font-semibold text-gray-400`,
    input: tw`w-full bg-transparent border-none text-white text-lg focus:outline-none`,
    phone: tw`flex border-b border-white border-opacity-20 mb-4`,
    addContactBtn: tw`flex items-center w-full`,
    button: tw`px-4 hover:bg-gray-700 rounded-lg py-1 text-white font-semibold`,
  };

  return (
    <div css={styles.container}>
      <Head>
        <title>PhoneBook</title>
      </Head>

      <div css={styles.card}>
        <h3 css={styles.title}>First Name</h3>
        <input
          css={styles.input}
          type="text"
          value={inputName?.first_name}
          placeholder="First Name"
          name="first_name"
          onChange={handleInputName}
        />
      </div>
      <div css={styles.card}>
        <h3 css={styles.title}>Last Name</h3>
        <input
          css={styles.input}
          type="text"
          value={inputName?.last_name}
          placeholder="Last Name"
          name="last_name"
          onChange={handleInputName}
        />
      </div>
      <div css={styles.card}>
        {inputPhone.phones.map((phone, key) => (
          <div css={styles.phone} key={key}>
            <div tw="w-full">
              <h3 css={styles.title}>Phone Number</h3>
              <input
                css={styles.input}
                type="text"
                value={phone.number}
                placeholder="Phone Number"
                name="number"
                onChange={(e) => {
                  const values = [...inputPhone.phones];
                  values[key].number = e.target.value;
                  setInputPhone({ phones: values });
                }}
              />
            </div>
            {inputPhone.phones.length > 1 && (
              <Image
                src="/Delete.svg"
                width={20}
                height={20}
                onClick={() =>
                  setInputPhone({ phones: inputPhone.phones.splice(key, 1) })
                }
              />
            )}
          </div>
        ))}
        <button
          css={styles.addContactBtn}
          onClick={() =>
            setInputPhone({ phones: [...inputPhone.phones, { number: "" }] })
          }
        >
          <Image src="/AddIcon.svg" width={20} height={20} />
          <p>Add Phone Number</p>
        </button>
      </div>
      <div>
        <button css={styles.button}>Cancel</button>
        <button css={styles.button} onClick={handleAddContact}>
          Add Contact
        </button>
      </div>
    </div>
  );
};

export default AddContact;
