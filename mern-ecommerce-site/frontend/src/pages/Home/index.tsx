import ProductCard from "@/features/product/ProductCard";

const HomePage = () => {
  // const { isPending, error, data } = useQuery({
  //   queryKey: ['repoData'],
  //   queryFn: () =>
  //     fetch('https://api.github.com/repos/TanStack/query').then((res) =>
  //       res.json(),
  //     ),
  // })

  // if (isPending) return 'Loading...'
  return (
    <div className="grid gap-2 grid-cols-6">
      {Array(20)
        .fill(0)
        .map((i, index) => (
          <ProductCard key={index} />
        ))}
    </div>
  );
};

export default HomePage;
