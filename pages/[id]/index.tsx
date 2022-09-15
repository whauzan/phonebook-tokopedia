import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import tw from "twin.macro";
import { ContactContext } from "../../context/ContactContext";
import useDeleteContact from "../../hooks/useDeleteContact";
import { Contact } from "../../interfaces/contact";

const ContactDetail = () => {
  const router = useRouter();
  const contactList = useContext(ContactContext);
  const [contact, setContact] = useState<Contact>();

  useEffect(() => {
    setContact(
      contactList.find(
        (element) => element.id === parseInt(router.query.id as string),
      ),
    );
  }, [contactList]);

  const { deleteContact, loadingDeleteContact } = useDeleteContact();

  const options = [
    {
      favorite: false,
      icon: "/Delete.svg",
      alt: "Delete Icon",
      onClick: () =>
        deleteContact({ variables: { id: contact?.id } }).then(() => {
          router.replace("/");
        }),
    },
    {
      favorite: false,
      icon: "/Edit.svg",
      alt: "Edit Icon",
      onClick: () => router.push(`/${contact?.id}/edit`),
    },
    {
      favorite: true,
      icon: contact?.isFavorite ? "/Favorite-fill.svg": "/Favorite.svg",
      alt: "Favorite Icon",
      onClick: async () => {
        contactList.map((element) => {
          if (element.id === contact?.id) {
            element.isFavorite = !element.isFavorite;
          }
        });
        localStorage.setItem("contactList", JSON.stringify(contactList));
        router.replace(router.asPath);
      },
    },
  ];

  const styles = {
    container: tw`min-h-screen max-w-6xl mx-auto pt-20 px-4 md:px-0`,
    avatar: tw`absolute top-0 -translate-y-1/2 flex justify-center items-center w-24 h-24 rounded-full bg-green-500 text-3xl font-semibold text-white`,
    card: tw`relative flex flex-col items-center justify-center w-full p-5 mb-6 bg-white bg-opacity-10 rounded-lg shadow-lg`,
    title: tw`text-2xl font-semibold text-white mt-10`,
    phoneContainer: ({ lastChild }: { lastChild: boolean }) => [
      !lastChild && tw`border-b border-white border-opacity-20 mb-4 pb-4`,
    ],
    options: tw`flex items-center gap-4 mt-4`,
    optionContainer: ({ favorite }: { favorite: boolean }) => [
      tw`flex justify-center items-center w-12 h-12 rounded-full bg-green-500 hover:bg-opacity-80 cursor-pointer`,
      favorite && tw`bg-white`,
    ],
    icon: ({ favorite }: { favorite: boolean }) => [
      !favorite &&
        tw`invert sepia saturate-0 brightness-[1.04] contrast-[1.02]`,
        favorite &&
          tw`invert-[0.72] sepia-[0.69] saturate-[4.905] hue-rotate-[121deg] brightness-[0.94] contrast-[0.87]`,
    ],
  };

  return (
    <div css={styles.container}>
      <Head>
        <title>PhoneBook</title>
      </Head>
      <div css={styles.card}>
        <div css={styles.avatar}>
          <h3>{contact?.first_name[0].toUpperCase()}</h3>
        </div>
        <h1
          css={styles.title}
        >{`${contact?.first_name} ${contact?.last_name}`}</h1>
        <div tw="flex items-center gap-x-2 mt-2">
          <p tw="text-sm">Mobile</p>
          <p tw="text-lg">{contact?.phones[0].number}</p>
        </div>
        <div css={styles.options}>
          {options.map((option, key) => (
            <div
              css={styles.optionContainer({ favorite: option.favorite })}
              key={key}
              onClick={option.onClick}
            >
              <Image
                css={styles.icon({ favorite: option.favorite })}
                src={option.icon}
                alt={option.alt}
                width={20}
                height={20}
              />
            </div>
          ))}
        </div>
      </div>
      <div css={styles.card}>
        <div tw="flex flex-col w-full justify-start">
          {contact?.phones.map((phone, key) => (
            <div
              css={styles.phoneContainer({
                lastChild: key === contact.phones.length - 1,
              })}
              key={key}
            >
              <p tw="text-sm">Mobile</p>
              <p tw="text-xl">{phone.number}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
