import { getGiangVien } from "@/ultis/giang_vien";
import Content from "./content";

const page = async ({ params }) => {
  const giang_vien = await getGiangVien(params.id);

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
