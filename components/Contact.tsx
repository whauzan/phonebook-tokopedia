import Image from "next/image";
import { useState } from "react";
import tw, { css } from "twin.macro";
import { Contact } from "../interfaces/contact";
import Dropdown from "./Dropdown";

interface ContactProps {
  data: Contact[];
}

const styles = {
  container: tw`flex items-center w-full gap-x-5 mb-2`,
  avatar: tw`flex justify-center items-center w-10 h-10 rounded-full bg-green-500 text-xl font-semibold text-white`,
  more: tw`invert sepia saturate-0 brightness-[1.04] contrast-[1.02] cursor-pointer`,
  dropdown: tw`relative flex items-center gap-2`,
};

const dropdownItems = [
  {
    title: "Detail",
    onClick: () => null,
  },
  {
    title: "Edit",
    onClick: () => console.log("Edit"),
  },
  {
    title: "Delete",
    onClick: () => console.log("Delete"),
  },
];

const ContactList = ({ data }: ContactProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  return (
    <>
      {data.map((contact) => (
        <div css={styles.container} key={contact.id}>
          <div>
            <div css={styles.avatar}>
              <h3>{contact.first_name[0]}</h3>
            </div>
          </div>
          <div tw="flex justify-between items-center w-full">
            <div>
              <h1 tw="mb-1">{`${contact.first_name} ${contact.last_name}`}</h1>
              <p>{contact.phones[0].number}</p>
            </div>
            <div
              css={styles.dropdown}
              onClick={() => {
                setIsOpen(!isOpen);
                setSelectedContact(contact);
              }}
            >
              <Image
                css={styles.more}
                src="/MoreIcon.svg"
                alt="More Icon"
                width={20}
                height={20}
              />
              {selectedContact?.id === contact.id && (
                <Dropdown items={dropdownItems} isOpen={isOpen} selectedContact={selectedContact} />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;
