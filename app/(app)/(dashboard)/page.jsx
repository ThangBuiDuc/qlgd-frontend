import NotSignedIn from "./_signedOut/content";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getCurrentCalendar } from "@/ultis/dashboard";
import { auth } from "@clerk/nextjs/server";
import NotSignedOut from "./_signedIn/content";

export default async function Page() {
  const { getToken } = await auth();
  var token;
  try {
    token = await getToken({
      template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
    });
  } catch (_) {
    token = null;
  }

  const calendar = await getCurrentCalendar(token);

  if (calendar.status !== 200) {
    throw new Error();
  }

  // console.log(await getToken({ template: "qlgd-gv" }));

  // throw new Error();
  // console.log(calendar.data);
  return (
    <>
      <SignedIn>
        {calendar.data.count > 0 ? (
          <NotSignedOut />
        ) : (
          <NotSignedIn calendar={calendar.data.lichs} />
        )}
      </SignedIn>
      <SignedOut>
        <NotSignedIn calendar={calendar.data.lichs} />
      </SignedOut>
    </>
  );
}
