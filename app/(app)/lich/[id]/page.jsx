import { SignedIn, SignedOut } from "@clerk/nextjs";
import Student from "./_student/content";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getCalendar } from "@/ultis/lich";
import Search from "@/app/_hardComponents/search";

const page = async ({ params }) => {
  const user = await currentUser();
  var calendar;
  if (user) console.log(1);
  else calendar = await getCalendar(null, params.id);

  if (calendar.status !== 200) {
    throw new Error();
  }

  return (
    <div className="flex flex-col gap-3">
      <Search />
      <SignedOut>
        <Student calendar={calendar.data} />
      </SignedOut>
      <SignedIn>{/* <Student  /> */}</SignedIn>
    </div>
  );
};

export default page;
