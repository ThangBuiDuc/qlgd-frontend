import { SignedIn, SignedOut } from "@clerk/nextjs";
import NotSignedIn from "./_signedOut/content";
import { auth, currentUser } from "@clerk/nextjs/server";
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
    <>
      <SignedOut>
        <NotSignedIn lop={lop.data} />
      </SignedOut>
      <SignedIn>{/* <Student  /> */}</SignedIn>
    </>
  );
};

export default page;
