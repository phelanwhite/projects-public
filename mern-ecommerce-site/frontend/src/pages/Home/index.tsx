import ProductCard from "@/features/product/ProductCard";
import Banner from "./Banner";
import SidebarLeft from "./SidebarLeft";

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
    <div className="flex items-start gap-6">
      {/* <div className="max-w-[250px] w-full">
        <SidebarLeft />
      </div> */}
      <div className="flex-1 space-y-6 overflow-hidden">
        <Banner />
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array(20)
            .fill(0)
            .map((i, index) => (
              <ProductCard key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
