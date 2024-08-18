import { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ArrowUpDown, CheckCheck, ListFilter, Trash2 } from "lucide-react";
import { data } from "@/data/assignment";
import { SearchBarContext } from "@/provider/searchBarProvider";

export const SearchBar = () => {
  const clssList = data.map((clss) => clss.ClassName);
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("SearchBar must be used within a SearchBarProvider");
  }
  const {
    filter,
    setFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    groupBy,
    setGroupBy,
  } = context;

  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-end p-4 items-center border-b-2 gap-2">
      <DropdownMenu open={open}>
        <DropdownMenuTrigger type="submit">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={() => setOpen(!open)}
          >
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Filter
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="flex justify-between items-center">
            Filter by
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={() => setOpen(!open)}
            >
              Close
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex justify-between items-center">
            Status
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1"
                onClick={() =>
                  setFilter({
                    ...filter,
                    Late: true,
                    Not: true,
                    Done: true,
                  })
                }
              >
                <CheckCheck className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="h-8 gap-1"
                onClick={() =>
                  setFilter({
                    ...filter,
                    Late: false,
                    Not: false,
                    Done: false,
                  })
                }
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={filter["Late"]}
            onCheckedChange={(checked) =>
              setFilter({ ...filter, Late: checked })
            }
          >
            Late Submitted
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filter["Not"]}
            onCheckedChange={(checked) =>
              setFilter({ ...filter, Not: checked })
            }
          >
            Not Submitted
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filter["Done"]}
            onCheckedChange={(checked) => {
              setFilter({ ...filter, Done: checked });
            }}
          >
            Submitted
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex justify-between items-center">
            Due Date
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1"
                onClick={() =>
                  setFilter({
                    ...filter,
                    No: true,
                  })
                }
              >
                <CheckCheck className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="h-8 gap-1"
                onClick={() =>
                  setFilter({
                    ...filter,
                    No: false,
                  })
                }
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={filter["No"]}
            onCheckedChange={(checked) => setFilter({ ...filter, No: checked })}
          >
            No Due Date
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex justify-between items-center">
            Class
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1"
                onClick={() =>
                  setFilter({
                    ...filter,
                    ...Object.fromEntries(clssList.map((clss) => [clss, true])),
                  })
                }
              >
                <CheckCheck className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="h-8 gap-1"
                onClick={() =>
                  setFilter({
                    ...filter,
                    ...Object.fromEntries(
                      clssList.map((clss) => [clss, false])
                    ),
                  })
                }
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {clssList.map((clss) => (
            <DropdownMenuCheckboxItem
              key={clss}
              checked={filter[clss]}
              onCheckedChange={(checked) => {
                setFilter({ ...filter, [clss]: checked });
              }}
            >
              {clss}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Sort
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenuRadioItem value="Status">Status</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="DueDate">
              Due Date
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuLabel>Order by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={sortOrder}
            onValueChange={setSortOrder}
          >
            <DropdownMenuRadioItem value="Ascending">
              Ascending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Descending">
              Descending
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuLabel>Group by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={groupBy} onValueChange={setGroupBy}>
            <DropdownMenuRadioItem value="Class">Class</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Assignment">
              Assignment
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchBar;
