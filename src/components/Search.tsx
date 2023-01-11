import { Dispatch, SetStateAction, useRef } from "react";
import { SickProps } from "../App";

interface SearchProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  getItems: SickProps[];
  setGetItems: Dispatch<SetStateAction<SickProps[]>>;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const Search = ({
  input,
  setInput,
  getItems,
  setGetItems,
  index,
  setIndex,
}: SearchProps) => {
  const keyRef = useRef<HTMLUListElement>(null);

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleKeyMove = (e: React.KeyboardEvent) => {
    if (!getItems || e.nativeEvent.isComposing) return;
    if (getItems.length > 0) {
      if (e.key === "ArrowDown") {
        setIndex(index + 1);
        // if (keyRef.current?.childElementCount === index + 1) {
        //   setIndex(0);
        // }
      } else if (e.key === "ArrowUp") {
        setIndex(index - 1);
        // if (index <= 0) {
        //   setGetItems([]);
        //   setIndex(-1);
        // }
      } else if (e.key === "Escape") {
        setGetItems([]);
        setIndex(-1);
      }
    }
  };

  return (
    <>
      <input
        className=" outline-none w-96 h-11 p-2"
        type="text"
        placeholder="검색어를 입력하세요"
        value={input}
        onChange={onChangeInput}
        onKeyDown={handleKeyMove}
      />
      <button className=" w-14 h-11 bg-blue-500 text-white">검색</button>
    </>
  );
};

export default Search;
