import { getGiangVien } from "@/ultis/giang_vien";
import Content from "./content";

const page = async ({ params, searchParams }) => {
  const giang_vien = await getGiangVien(params.id, searchParams);

  if (giang_vien.status !== 200) {
    throw new Error();
  }

  // console.log(giang_vien.data);
  return (
    <>
      <Content giang_vien={giang_vien.data} />
    </>
  );
};

export default page;
