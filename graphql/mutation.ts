import { gql } from "@apollo/client";

export const ADD_CONTACT = gql`
  mutation AddContact(
    $created_at: timestamptz!
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        created_at: $created_at
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        created_at
        first_name
        id
        last_name
        phones {
          number
        }
      }
    }
  }
`;

export const UPDATE_PHONE = gql`
  mutation UpdatePhone($pk_columns: phone_pk_columns_input!, $number: String!) {
    update_phone_by_pk(pk_columns: $pk_columns, _set: { number: $number }) {
      contact {
        created_at
        first_name
        id
        last_name
        phones {
          id
          number
        }
      }
    }
  }
`;
