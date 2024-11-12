import NotSignedIn from "./_signedOut/content";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getCurrentCalendar } from "@/ultis/dashboard";

export default async function Page() {
  const calendar = await getCurrentCalendar();

  if (calendar.status !== 200) {
    throw new Error();
  }
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
