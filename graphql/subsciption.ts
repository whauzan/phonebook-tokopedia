import { gql } from "@apollo/client";

export const SUBS_ONE_CONTACT = gql`
  subscription SubsOneContact($id: Int!) {
    contact_by_pk(id: $id) {
      created_at
      first_name
      id
      last_name
      phones {
        number
        id
      }
    }
  }
`;
