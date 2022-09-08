import { useMutation } from "@apollo/client";
import { UPDATE_PHONE } from "../graphql/mutation";
import { Contact } from "../interfaces/contact";

interface UpdatePhoneMutation {
  update_phone_by_pk: {
    contact: Contact;
  };
}

interface UpdatePhoneMutationVariables {
  pk_columns: {
    id: number;
  };
  number: string;
}

export default function useUpdatePhone() {
  const [updatePhone, { loading: loadingUpdatePhone }] = useMutation<
    UpdatePhoneMutation,
    UpdatePhoneMutationVariables
  >(UPDATE_PHONE);
  return { updatePhone, loadingUpdatePhone };
}
