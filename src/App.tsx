import axios from "axios";
import { useEffect, useState } from "react";
import AutoSearch from "./components/AutoSearch";
import Search from "./components/Search";

export interface SickProps {
  sickCd: string;
  sickNm: string;
}

interface DataProps {
  includes(data: string): boolean;
  sickNm: string;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [getItems, setGetItems] = useState<SickProps[]>([]);
  const [index, setIndex] = useState<number>(-1);

  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/sick`);
    let key = res.data.filter(
      (list: DataProps) => list.sickNm?.includes(input) === true
    );
    setGetItems(key);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (input) {
        getData();
      }
      console.log("calling api");
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [input]);
  // debounce를 사용하기 위해 setTimeOut 함수를 사용
  // setTimeout 없으면 input에 값을 입력할 때마다 updateData 함수를 호출
  // setTimeout으로 시간차를 두어 input 입력이 끝나면 호출되도록

  return (
    <div className=" w-full h-screen bg-sky-200 flex justify-center">
      <div>
        <Search
          input={input}
          setInput={setInput}
          getItems={getItems}
          setGetItems={setGetItems}
          index={index}
          setIndex={setIndex}
        />
        {getItems.length >= 0 && input && (
          <AutoSearch setInput={setInput} getItems={getItems} index={index} />
        )}
      </div>
    </div>
  );
}

export default App;
