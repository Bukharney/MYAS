import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { AssignmentsContext } from "./assignmentsProvider";
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
  classList: string[];
}

const SearchBarContext = createContext<SearchBarContextProps | undefined>(
  undefined
);

const SearchBarProvider = ({ children }: { children: ReactNode }) => {
  const context = useContext(AssignmentsContext);
  if (!context) {
    throw new Error("SearchBar must be used within a SearchBarProvider");
  }

  const { assignments } = context;

  const classList = Array.from(
    new Set(assignments.map((assignment) => assignment.ClassName))
  );
  const [sortBy, setSortBy] = useState<string>("Status");
  const [sortOrder, setSortOrder] = useState<string>("Ascending");
  const [groupBy, setGroupBy] = useState<string>("Class");
  const [filter, setFilter] = useState<CheckedList>({
    Late: true,
    Not: true,
    Done: true,
    No: true,
    ...Object.fromEntries(classList.map((clss) => [clss, true])),
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
    classList,
  };

  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  );
};

export { SearchBarContext, SearchBarProvider };
