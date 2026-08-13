import useFetchData from "./useFetchData";

const CustomHook = () => {
  const [data, loading, error] = useFetchData();

  if (loading) return <p>Loading . . .</p>;
  if (error) return <p>Error</p>;
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
