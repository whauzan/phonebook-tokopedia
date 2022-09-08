import { gql } from "@apollo/client";

export const GET_CONTACT_LIST = gql`
  query GetContactList {
    contact {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

export const GET_ONE_CONTACT = gql`
  query GetOneContact($id: Int!) {
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