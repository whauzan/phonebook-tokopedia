import { useMutation } from "@apollo/client";
import { ADD_PHONE } from "../graphql/mutation";

interface AddPhoneMutationVariables {
  objects: {
    contact_id: string;
    number: string;
  }[];
}

export default function useAddPhone() {
  const [addPhone, { loading: loadingAddPhone }] =
    useMutation<AddPhoneMutationVariables>(ADD_PHONE);
  return { addPhone, loadingAddPhone };
}
