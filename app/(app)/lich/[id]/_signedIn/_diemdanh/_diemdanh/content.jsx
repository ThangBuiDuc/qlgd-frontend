"use client";

import Loading from "@/app/_hardComponents/loading";
import { getDiemDanhLop } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import ThongTin from "./thongtin";
import DiemDanh from "./diemdanh";

const DiemDanhTab = ({ params }) => {
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["diem_danh_lich", params.id],
    queryFn: async () =>
      getDiemDanhLop(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id
      ),
  });

  //   console.log(data);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-5">
      <ThongTin data={data.info.lich} />
      <DiemDanh data={data.enrollments} />
    </div>
  );
};

export default DiemDanhTab;
