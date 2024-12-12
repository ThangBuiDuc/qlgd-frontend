import { SignedIn, SignedOut } from "@clerk/nextjs";
import NotSignedIn from "./_signedOut/content";
import { auth } from "@clerk/nextjs/server";
import { getLop } from "@/ultis/lop";
import NotSignedOut from "./_signedIn/content";
import { getChiTietLopGiangVien } from "@/ultis/giang_vien";

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

  // const lop = await getLop(token, params.id);
  // getChiTietLopGiangVien(
  //       await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
  //       params.id
  //     ),

  const [lop, chi_tiet_lop] = await Promise.all([
    getLop(token, params.id),
    getChiTietLopGiangVien(token, params.id),
  ]);

  if (lop.status !== 200) {
    throw new Error();
  }

  // console.log(lop.data);

  return (
    <>
      <SignedOut>
        <NotSignedIn lop={lop.data.lop} />
      </SignedOut>
      <SignedIn>
        {lop.data.truongkhoa ? (
          <NotSignedOut truongkhoa />
        ) : lop.data.authorized ? (
          <NotSignedOut lop={lop.data.lop} chi_tiet_lop={chi_tiet_lop} />
        ) : (
          <NotSignedIn lop={lop.data.lop} />
        )}
      </SignedIn>
    </>
  );
};

export default page;
