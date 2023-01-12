import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { SickProps } from "../App";

interface AutoProps {
  setInput: Dispatch<SetStateAction<string>>;
  getItems: SickProps[];
  index: number;
}

const AutoSearch = ({ setInput, getItems, index }: AutoProps) => {
  const handleAutoClick = (e: string) => {
    setInput(e);
  };
  // 자동 완성 click 하면 input에 넣기

  return (
    <div className=" w-96 h-80 bg-white mt-2 p-2 overflow-scroll">
      {getItems.length === 0 ? (
        <p className=" text-gray-500">추천 검색가 없습니다.</p>
      ) : (
        <ul>
          <p className=" text-xs text-gray-400">추천 검색어</p>
          {getItems.map((search, idx) => (
            <Li
              key={search.sickCd}
              onClick={() => {
                setInput(search.sickNm), handleAutoClick(search.sickNm);
              }}
              isFocus={index === idx ? true : false}
            >
              <p className=" truncate overflow-hidden">{search.sickNm}</p>
            </Li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Li = styled.li<{ isFocus?: boolean }>`
  background-color: ${(props) => (props.isFocus ? "#ebebeb" : "")};
  &:hover {
    background-color: #ebebeb;
    cursor: pointer;
  }
`;

export default AutoSearch;
