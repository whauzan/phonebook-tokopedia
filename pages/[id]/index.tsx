import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import tw from "twin.macro";
import useGetContact from "../../hooks/useGetContact";
import { Contact } from "../../interfaces/contact";

const ContactDetail = () => {
  const { query } = useRouter();

  const [contact, setContact] = useState<Contact>();
  const { loadingGetContact, errorGetContact, dataGetContact } = useGetContact(
    parseInt(query.id as string),
  );

  useEffect(() => {
    if (dataGetContact) {
      setContact(dataGetContact.contact_by_pk);
    }
  }, [dataGetContact]);

  const options = [
    {
      favorite: false,
      icon: "/Delete.svg",
      alt: "Delete Icon",
    },
    {
      favorite: false,
      icon: "/Edit.svg",
      alt: "Edit Icon",
    },
    {
      favorite: true,
      icon: "/Favorite.svg",
      alt: "Favorite Icon",
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
      //   favorite &&
      //     tw`invert-[0.72] sepia-[0.69] saturate-[4.905] hue-rotate-[121deg] brightness-[0.94] contrast-[0.87]`,
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
            <>
              {option.alt.includes("Edit") ? (
                <Link href={`/${query.id}/edit`} key={key}>
                  <div
                    css={styles.optionContainer({ favorite: option.favorite })}
                  >
                    <Image
                      css={styles.icon({ favorite: option.favorite })}
                      src={option.icon}
                      alt={option.alt}
                      width={20}
                      height={20}
                    />
                  </div>
                </Link>
              ) : (
                <div
                  css={styles.optionContainer({ favorite: option.favorite })}
                  key={key}
                >
                  <Image
                    css={styles.icon({ favorite: option.favorite })}
                    src={option.icon}
                    alt={option.alt}
                    width={20}
                    height={20}
                  />
                </div>
              )}
            </>
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
