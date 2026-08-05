import { SearchIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

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
        console.log(searchTerm);
        setSearchTerm("");
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
    </form>
  );
}
