import Search from "@/app/_hardComponents/search";
// import Content from "./content";
import { search } from "@/ultis/search";
import Student from "./_student";

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

  // if (results.status !== 200) {
  //   throw new Error();
  // }
  // const data = results;
  return (
    <div className="flex flex-col gap-3">
      <Search type={searchParams.type} q={searchParams.q} />
      {searchParams.type == 1 && <Student results={results} />}
    </div>
  );
};

export default Page;
