import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { getCalendar } from "@/ultis/lich";
import NotSignedIn from "./_signedOut/content";
import { getLop } from "@/ultis/lop";
import NotSignedOut from "./_signedIn/content";

const page = async ({ params }) => {
  const { getToken } = await auth();
  var token;
  var show;
  try {
    token = await getToken({
      template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
    });
  } catch (_) {
    token = null;
  }
  if (token) show = await getLop(token, params.id);
  else show = await getCalendar(params.id);

  if (show.status !== 200) {
    throw new Error();
  }

  console.log(show.data);

  return (
    <>
      <SignedOut>
        <NotSignedIn calendar={show.data} />
      </SignedOut>
      <SignedIn>
        {show.data.authorized ? (
          <NotSignedOut lop={show.data.lop} />
        ) : (
          <NotSignedIn calendar={show.data} />
        )}
      </SignedIn>
    </>
  );
};

export default page;
