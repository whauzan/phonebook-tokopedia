import Link from "next/link";
import tw from "twin.macro";
import { Contact } from "../interfaces/contact";

interface DropdownProps {
  items: {
    title: string;
    onClick: () => void;
  }[];
  isOpen: boolean;
  selectedContact: Contact;
}

const Dropdown = ({ items, isOpen, selectedContact }: DropdownProps) => {
  const styles = {
    container: ({ isOpen }: { isOpen: boolean }) => [
      tw`absolute top-[50px] right-0 bg-white  rounded-md shadow-md transition-all duration-300 ease-in-out opacity-0`,
      isOpen && tw`opacity-100 visible top-[30px]`,
    ],
    item: tw`flex items-center justify-between w-full pl-5 pr-9 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer`,
  };

  return (
    <>
      <div css={styles.container({ isOpen })}>
        {items.map((item) => (
          <div css={styles.item} onClick={item.onClick} key={item.title}>
            {item.title !== "Delete" ? (
              <Link
                href={`/${selectedContact.id}`}
              >
                <p>{item.title}</p>
              </Link>
            ) : (
              <p>{item.title}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Dropdown;
