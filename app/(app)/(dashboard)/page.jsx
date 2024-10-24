import Search from "@/app/_hardComponents/search";
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
    <div className="flex flex-col gap-3">
      <Search />
      <SignedOut>
        <NotSignedIn calendar={calendar.data} />
      </SignedOut>
    </div>
  );
}
