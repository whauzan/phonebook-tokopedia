import tw from "twin.macro";

interface SearchBarProps {
  input?: string;
  setInput: (input: string) => void;
}

const styles = {
  container: tw`relative rounded-full w-full md:w-96`,
  icon: tw`absolute top-1/2 left-3 w-4 h-4 -translate-y-1/2`,
  input: tw`w-full px-10 py-2 rounded-full text-black border-2 border-gray-300 border-solid focus:(border-2 border-green-500) focus:(outline-none)`,
};

const SearchBar = ({ input, setInput }: SearchBarProps) => (
  <div css={styles.container}>
    <img src="/SearchIcon.svg" alt="Search Icon" css={styles.icon} />
    <input
      css={styles.input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search"
      type="text"
      value={input}
    />
  </div>
);

export default SearchBar;
