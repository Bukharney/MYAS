import { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { SearchBarContext } from "@/provider/SearchBarProvider";

export const SearchBar = () => {
  const context = useContext(SearchBarContext);

  if (!context) {
    throw new Error("SearchBar must be used within a SearchBarProvider");
  }

  const { sortBy, setSortBy, sortOrder, setSortOrder, groupBy, setGroupBy } =
    context;

  return (
    <div className="flex justify-end p-4 items-center border-b-2 gap-2">
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            <SelectItem value="Status">Status</SelectItem>
            <SelectItem value="DueDate">DueDate</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort order" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort order</SelectLabel>
            <SelectItem value="Ascending">Ascending</SelectItem>
            <SelectItem value="Descending">Descending</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={groupBy} onValueChange={setGroupBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Group by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Group by</SelectLabel>
            <SelectItem value="Class">Class</SelectItem>
            <SelectItem value="Assignment">Assignment</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
