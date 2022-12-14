import tw from "twin.macro";

interface PaginationProps {
  contactsPerPage: number;
  totalContacts: number;
  paginateBack: () => void;
  paginateFront: () => void;
  currentPage: number;
}

const Pagination = ({
  contactsPerPage,
  totalContacts,
  paginateBack,
  paginateFront,
  currentPage,
}: PaginationProps) => {
  return (
    <div tw="py-2">
      <div>
        <p tw="text-sm text-white">
          Showing
          <span tw="font-medium"> {currentPage * contactsPerPage - 9} </span>
          to
          <span tw="font-medium">
            {" "}
            {currentPage * contactsPerPage < totalContacts
              ? currentPage * contactsPerPage
              : totalContacts}{" "}
          </span>
          of
          <span tw="font-medium"> {totalContacts} </span>
          results
        </p>
      </div>
      <nav tw="block"></nav>
      <div>
        <nav
          tw="relative z-0 inline-flex rounded-md shadow-sm -space-x-px cursor-pointer"
          aria-label="Pagination"
        >
          {currentPage > 1 && (
            <p
              onClick={() => {
                paginateBack();
              }}
              tw="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span>Previous</span>
            </p>
          )}

          {currentPage < totalContacts / contactsPerPage && (
            <p
              onClick={() => {
                paginateFront();
              }}
              tw="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span>Next</span>
            </p>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
