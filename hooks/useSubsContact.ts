import { useSubscription } from "@apollo/client";
import { SUBS_ONE_CONTACT } from "../graphql/subsciption";
import { Contact } from "../interfaces/contact";

interface ContactQueryResponse {
  contact_by_pk: Contact;
}

export default function useSubsContact(id: number) {
  const {
    loading: loadingSubsContact,
    error: errorSubsContact,
    data: dataSubsContact,
  } = useSubscription<ContactQueryResponse>(SUBS_ONE_CONTACT, {
    variables: { id },
  });
  return { loadingSubsContact, errorSubsContact, dataSubsContact };
}
