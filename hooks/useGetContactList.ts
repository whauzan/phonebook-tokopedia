import { useQuery } from "@apollo/client";
import { GET_CONTACT_LIST } from "../graphql/query";
import { Contact } from "../interfaces/contact";

interface ContactQueryResponse {
  contact: Contact[];
}

export default function useGetContactList() {
  const {
    loading: loadingGetContactList,
    error: errorGetContactList,
    data: dataGetContactList,
  } = useQuery<ContactQueryResponse>(GET_CONTACT_LIST);
  return { loadingGetContactList, errorGetContactList, dataGetContactList };
}
