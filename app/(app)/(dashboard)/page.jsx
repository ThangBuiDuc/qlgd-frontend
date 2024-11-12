import NotSignedIn from "./_signedOut/content";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { getCurrentCalendar } from "@/ultis/dashboard";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { getToken } = await auth();
  const calendar = await getCurrentCalendar();

  if (calendar.status !== 200) {
    throw new Error();
  }

  console.log(await getToken({ template: "qlgd-gv" }));

  // throw new Error();
  // console.log(calendar.data);
  return (
    <>
      <SignedOut>
        <NotSignedIn calendar={calendar.data} />
      </SignedOut>
    </>
  );
}
