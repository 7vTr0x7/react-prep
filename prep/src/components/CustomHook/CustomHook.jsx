import { useMemo } from "react";
import useFetchData from "./useFetchData";

const CustomHook = () => {
  const [data] = useMemo(() => useFetchData(), []);
  return (
    <div>
      {data.map((d) => (
        <div key={d.id}>
          <p>{d.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomHook;
