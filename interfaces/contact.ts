import { Phone } from "./phone";

export interface Contact {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: Phone[];
  contact_by_pk?: Contact;
}
