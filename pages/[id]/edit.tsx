import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import tw from "twin.macro";
import useGetContact from "../../hooks/useGetContact";
import useSubsContact from "../../hooks/useSubsContact";
import useUpdatePhone from "../../hooks/useUpdatePhone";
import { Contact } from "../../interfaces/contact";

const ContactEdit = () => {
  const { query } = useRouter();

  const [contact, setContact] = useState<Contact>();

  interface InputName {
    first_name: string;
    last_name: string;
  }

  // let defaultInputName: InputName = {
  //   first_name: "",
  //   last_name: "",
  // };

  const [defaultInputName, setDefaultInputName] = useState<InputName>({
    first_name: "",
    last_name: "",
  });

  interface InputPhone {
    number: string;
    id: number;
  }

  const [defaultInputPhone, setDefaultInputPhone] = useState<InputPhone[]>([
    { number: "", id: 0 },
  ]);

  const { loadingSubsContact, errorSubsContact, dataSubsContact } =
    useSubsContact(parseInt(query.id as string));

  useEffect(() => {
    if (errorSubsContact) {
      console.log(errorSubsContact);
    }
    if (dataSubsContact) {
      setContact(dataSubsContact.contact_by_pk);

      setDefaultInputName({
        first_name: dataSubsContact.contact_by_pk.first_name,
        last_name: dataSubsContact.contact_by_pk.last_name,
      });
      setInputName({
        first_name: dataSubsContact.contact_by_pk.first_name,
        last_name: dataSubsContact.contact_by_pk.last_name,
      });

      setDefaultInputPhone(
        dataSubsContact.contact_by_pk.phones.map((phone) => {
          return {
            number: phone.number,
            id: phone.id,
          };
        }),
      );
      setInputPhone(
        dataSubsContact.contact_by_pk.phones.map((phone) => {
          return {
            number: phone.number,
            id: phone.id,
          };
        }),
      );
    }
  }, [dataSubsContact, errorSubsContact]);

  const [inputName, setInputName] = useState(defaultInputName);

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName({
      ...inputName,
      [e.target.name]: e.target.value,
    });

    e.preventDefault();
  };

  const [inputPhone, setInputPhone] = useState(defaultInputPhone);

  const handleInputPhone = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setIsUpdatingPhone(true);
    console.log(isUpdatingPhone);
    setInputPhone(
      [...inputPhone].map((phone) => {
        if (phone.id === id) {
          return {
            ...phone,
            number: e.target.value,
          };
        }
        return phone;
      }),
    );

    e.preventDefault();
  };

  const { updatePhone, loadingUpdatePhone } = useUpdatePhone();
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false);
  const handleEditPhone = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.preventDefault();
    inputPhone.map((phone) => {
      if (phone.id === id) {
        updatePhone({
          variables: {
            pk_columns: {
              id: phone.id,
            },
            number: phone.number,
          },
        });
      }
    });
  };

  const handleCancelEditPhone = (id: number) => {
    setIsUpdatingPhone(false);
    setInputPhone(
      [...inputPhone].map((phone) => {
        if (phone.id === id) {
          return {
            ...phone,
            number: defaultInputPhone?.find((phone) => phone.id === id)
              ?.number!,
          };
        }
        return phone;
      }),
    );
  };

  const styles = {
    container: tw`min-h-screen max-w-6xl mx-auto pt-20 px-4 md:px-0 flex flex-col items-center`,
    avatar: tw`flex justify-center items-center w-24 h-24 rounded-full bg-green-500 text-3xl font-semibold text-white`,
    card: tw`w-full max-w-2xl bg-white bg-opacity-10 rounded-lg shadow-lg py-2 px-4 mt-6`,
    title: tw`text-sm font-semibold text-gray-400`,
    input: tw`w-full bg-transparent border-none text-white text-lg focus:outline-none`,
    buttons: ({ isUpdate }: { isUpdate: boolean }) => [
      tw`flex justify-between mx-auto w-3/4 transition-all duration-300 ease-in-out opacity-0`,
      isUpdate &&
        tw`mt-4 opacity-100 w-3/4`,
    ],
    button: tw`px-4 hover:bg-gray-700 rounded-lg py-1 text-white font-semibold`,
    phone: ({
      lastChild,
      isUpdate,
    }: {
      lastChild: boolean;
      isUpdate: boolean;
    }) => [
      !lastChild && tw`border-b border-white border-opacity-20 mb-4`,
      isUpdate && tw`pb-4`,
      !isUpdate && tw`pb-2`,
    ],
  };

  return (
    <div css={styles.container}>
      <Head>
        <title>PhoneBook</title>
      </Head>

      <div css={styles.avatar}>
        <h3>{contact?.first_name[0].toUpperCase()}</h3>
      </div>
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
        {inputPhone?.map((phone, key) => (
          <div
            css={styles.phone({
              lastChild: key === inputPhone.length - 1,
              isUpdate: isUpdatingPhone,
            })}
            key={key}
          >
            <h3 css={styles.title}>Phone Number</h3>
            <input
              css={styles.input}
              type="text"
              value={inputPhone.find((item) => item.id === phone.id)?.number}
              placeholder="Phone Number"
              name="number"
              onChange={(e) => handleInputPhone(e, phone.id)}
            />
            <div css={styles.buttons({ isUpdate: isUpdatingPhone })}>
              <button
                css={styles.button}
                onClick={() => handleCancelEditPhone(phone.id)}
              >
                Cancel
              </button>
              <button
                css={styles.button}
                onClick={(e) => handleEditPhone(e, phone.id)}
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactEdit;
