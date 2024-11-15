import { SignedIn, SignedOut } from "@clerk/nextjs";
import NotSignedIn from "./_signedOut/content";
import { auth } from "@clerk/nextjs/server";
import { getLop } from "@/ultis/lop";
import NotSignedOut from "./_signedIn/content";

const page = async ({ params }) => {
  const { getToken } = await auth();
  var token;
  try {
    token = await getToken({
      template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
    });
  } catch (_) {
    token = null;
  }

  const lop = await getLop(token, params.id);

  if (lop.status !== 200) {
    throw new Error();
  }

  return (
    <>
      <SignedOut>
        <NotSignedIn lop={lop.data.lop} />
      </SignedOut>
      <SignedIn>
        {lop.data.authorized ? (
          <NotSignedOut lop={lop.data.lop} />
        ) : (
          <NotSignedIn lop={lop.data.lop} />
        )}
      </SignedIn>
    </>
  );
};

export default page;
