import { SignedIn, SignedOut } from "@clerk/nextjs";
import Student from "./_student/content";
import { auth, currentUser } from "@clerk/nextjs/server";
import Search from "@/app/_hardComponents/search";
import { getLop } from "@/ultis/lop";

const page = async ({ params }) => {
  const user = await currentUser();
  var lop;
  if (user) console.log(1);
  else lop = await getLop(null, params.id);

  if (lop.status !== 200) {
    throw new Error();
  }

  return (
    <div className="flex flex-col gap-3">
      <Search />
      <SignedOut>
        <Student lop={lop.data} />
      </SignedOut>
      <SignedIn>{/* <Student  /> */}</SignedIn>
    </div>
  );
};

export default page;
