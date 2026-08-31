import { useNavigate } from "@tanstack/react-router";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SearchForm({ query }: { query: string }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const searchClubs = (string: string) => {
    navigate({
      to: "/",
      search: {
        q: string.trim(),
      },
    });
  };

  useEffect(() => {
    if (query.trim() !== "") {
      setSearchTerm(query.trim());
    }
  }, [query]);

  return (
    <form
      className="flex cursor-text gap-4 rounded-xl border bg-white p-4 shadow-md"
      onClick={focusInput}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          focusInput();
        }
      }}
      onSubmit={(e) => {
        e.preventDefault();
        searchClubs(searchTerm.trim());
      }}
    >
      <SearchIcon />
      <input
        ref={inputRef}
        className="flex-1 outline-none"
        type="text"
        placeholder="search for anything"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm !== "" && (
        <XIcon
          className="cursor-pointer"
          onClick={() => {
            setSearchTerm("");
            searchClubs("");
          }}
        />
      )}
    </form>
  );
}
