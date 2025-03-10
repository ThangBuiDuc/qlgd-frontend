import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { getCalendar } from "@/ultis/lich";
import NotSignedIn from "./_signedOut/content";
import NotSignedOut from "./_signedIn/content";

const page = async ({ params, searchParams }) => {
  const { getToken } = await auth();
  var token;
  var calendar;
  try {
    token = await getToken({
      template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
    });
  } catch (_) {
    token = null;
  }
  calendar = await getCalendar(token, params.id, searchParams);

  if (calendar.status !== 200) {
    throw new Error();
  }

  return (
    <>
      <SignedOut>
        <NotSignedIn calendar={calendar.data} />
      </SignedOut>
      <SignedIn>
        {calendar.data.authorized ? (
          <NotSignedOut lop={calendar.data.lop} />
        ) : (
          <NotSignedIn calendar={calendar.data} />
        )}
      </SignedIn>
    </>
  );
};

export default page;
