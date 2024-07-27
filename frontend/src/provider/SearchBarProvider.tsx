import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SearchBarContextProps {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: Dispatch<SetStateAction<string>>;
  groupBy: string;
  setGroupBy: Dispatch<SetStateAction<string>>;
}

const SearchBarContext = createContext<SearchBarContextProps | undefined>(
  undefined
);

const SearchBarProvider = ({ children }: { children: ReactNode }) => {
  const [sortBy, setSortBy] = useState<string>("Status");
  const [sortOrder, setSortOrder] = useState<string>("Ascending");
  const [groupBy, setGroupBy] = useState<string>("Class");

  const value = {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    groupBy,
    setGroupBy,
  };

  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  );
};

export { SearchBarContext, SearchBarProvider };
