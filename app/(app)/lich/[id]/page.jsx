import { SignedIn, SignedOut } from "@clerk/nextjs";
import Student from "./_student/content";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getCalendar } from "@/ultis/lich";

const page = async ({ params }) => {
  const user = await currentUser();
  var calendar;
  if (user) console.log(1);
  else calendar = await getCalendar(null, params.id);

  if (calendar.status !== 200) {
    throw new Error();
  }

  return (
    <>
      <SignedOut>
        <Student />
      </SignedOut>
      <SignedIn>
        <Student calendar={calendar.data} />
      </SignedIn>
    </>
  );
};

export default page;
