import FormInput from "@components/FormElements/FormInput";
import SearchResults from "./SearchResults";
import { useState } from "react";
import useDebounce from "@hooks/useDebounce";

export default function SearchAccount() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Users</h1>
      <Search />
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  const defferQuery = useDebounce(query, 2000);
  const isStale = defferQuery !== query;
  return (
    <>
      <FormInput
        id={"search-users"}
        name={"search-users"}
        type={"search"}
        placeholder={"Search users..."}
        value={query}
        onChange={(e) => setQuery(e.target.value.trim())}
      />
      <div className={isStale ? "opacity-50" : ""}>
        <SearchResults query={defferQuery} />
      </div>
    </>
  );
}
