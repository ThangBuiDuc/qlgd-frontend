import { getSinhVien } from "@/ultis/sinh_vien";
import Content from "./content";

const page = async ({ params, searchParams }) => {
  const sinh_vien = await getSinhVien(params.id, searchParams);

  if (sinh_vien.status !== 200) {
    throw new Error();
  }

  // console.log(sinh_vien.data);
  return (
    <>
      <Content sinh_vien={sinh_vien.data} />
    </>
  );
};

export default page;
