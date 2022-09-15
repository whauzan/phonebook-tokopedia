import { useMutation } from "@apollo/client";
import { DELETE_CONTACT } from "../graphql/mutation";
import { GET_CONTACT_LIST } from "../graphql/query";

interface DeleteContactMutationVariables {
  id: number;
}

export default function useDeleteContact() {
  const [deleteContact, { loading: loadingDeleteContact }] =
    useMutation<DeleteContactMutationVariables>(DELETE_CONTACT, {
      refetchQueries: [{ query: GET_CONTACT_LIST }],
    });
  return { deleteContact, loadingDeleteContact };
}
