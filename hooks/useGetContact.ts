import { useQuery } from "@apollo/client";
import { GET_ONE_CONTACT } from "../graphql/query";
import { Contact } from "../interfaces/contact";

interface ContactQueryResponse {
  contact_by_pk: Contact;
}

export default function useGetContact(id: number) {
  const {
    loading: loadingGetContact,
    error: errorGetContact,
    data: dataGetContact,
  } = useQuery<ContactQueryResponse>(GET_ONE_CONTACT, {
    variables: { id },
  });
  return { loadingGetContact, errorGetContact, dataGetContact };
}
