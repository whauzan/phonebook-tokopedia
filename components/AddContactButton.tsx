import Image from "next/image";
import tw from "twin.macro";

const styles = {
  container: tw`fixed bottom-7 right-7`,
  btn: tw`flex justify-center items-center w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 ease-in-out`,
  icon: tw`invert sepia saturate-0 brightness-[1.04] contrast-[1.02] cursor-pointer`,
};

const AddContactButton = () => (
  <div css={styles.container}>
    <button css={styles.btn} onClick={() => null}>
      <Image
        css={styles.icon}
        src="/AddIcon.svg"
        alt="Add Icon"
        width={30}
        height={30}
      />
    </button>
  </div>
);

export default AddContactButton;
