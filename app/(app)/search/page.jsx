import Search from "@/app/_hardComponents/search";
import Content from "./content";
import { search } from "@/ultis/search";

const Page = async ({ searchParams }) => {
  //   console.log(searchParams);
  var results;
  if (!searchParams.type) throw new Error("There's nothing to search!");
  if (searchParams.type == 1) {
    results = await search({
      type: searchParams.type,
      page: searchParams.page,
      query: searchParams.q,
    });
  }

  if (results.status !== 200) {
    throw new Error();
  }

  console.log(results.data);

  return (
    <div className="flex flex-col gap-3">
      <Search type={searchParams.type} q={searchParams.q} />
      <Content />
    </div>
  );
};

export default Page;
