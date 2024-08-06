import { data } from "@/data/assignment";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type CheckedList = {
  [key: string]: DropdownMenuCheckboxItemProps["checked"];
};

interface SearchBarContextProps {
  filter: CheckedList;
  setFilter: Dispatch<SetStateAction<CheckedList>>;
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
  const clssList = data.map((clss) => clss.ClassName);

  const [sortBy, setSortBy] = useState<string>("Status");
  const [sortOrder, setSortOrder] = useState<string>("Ascending");
  const [groupBy, setGroupBy] = useState<string>("Class");
  const [filter, setFilter] = useState<CheckedList>({
    Late: true,
    Not: true,
    Done: true,
    No: true,
    ...Object.fromEntries(clssList.map((clss) => [clss, true])),
  });

  const value = {
    filter,
    setFilter,
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
