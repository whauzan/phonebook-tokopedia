import { useMutation } from "@apollo/client";
import { ADD_CONTACT } from "../graphql/mutation";

interface AddContactMutation {
  insert_contact: {
    returning: [
      {
        id: number;
      },
    ];
  };
}

interface AddContactMutationVariables {
  created_at: string;
  first_name: string;
  last_name: string;
}

export default function useAddContact() {
  const [addContact, { loading: loadingAddContact }] = useMutation<
    AddContactMutation,
    AddContactMutationVariables
  >(ADD_CONTACT);
  return { addContact, loadingAddContact };
}
