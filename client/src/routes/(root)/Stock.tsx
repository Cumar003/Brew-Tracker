import DrinkCard from "@/components/cards/DrinkCard"

const Stock = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {Array.from({ length: 15 }).map((_, idx) => (
        <DrinkCard key={idx} />
      ))}
    </div>
  );
};

export default Stock;
