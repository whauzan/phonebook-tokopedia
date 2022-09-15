import { Contact } from "../interfaces/contact";

interface FavoriteContactProps {
    data: Contact[];
}

const FavoriteContact = ({ data }: FavoriteContactProps) => {
    const styles = {
        
    }
    return (
        <>
            {data.map((contact) => (
                <div key={contact.id}>
                    <h3>{contact.first_name}</h3>
                </div>
            ))}
        </>
    );
}

export default FavoriteContact;