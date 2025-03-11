"use client";

import Loading from "@/app/_hardComponents/loading";
import { getDiemDanhLop } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import ThongTin from "./thongtin";
import DiemDanh from "./diemdanh";
import { useSearchParams } from "next/navigation";

const DiemDanhTab = ({ params }) => {
  const searchParams = useSearchParams();
  const isActionable =
    searchParams.get("hocky") && searchParams.get("namhoc") ? false : true;
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: [
      "diem_danh_lich",
      params.id,
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getDiemDanhLop(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id,
        { hocky: searchParams.get("hocky"), namhoc: searchParams.get("namhoc") }
      ),
  });

  if (isLoading) return <Loading />;

  // console.log(data);

  return (
    <div className="flex flex-col gap-5">
      <ThongTin
        data={data.info.lich}
        lop_id={data.info.lop.id}
        isActionable={isActionable}
      />
      <DiemDanh
        isActionable={isActionable}
        data={data.enrollments}
        state={data.info.lich.updated}
        so_tiet={data.info.lich.so_tiet}
      />
    </div>
  );
};

export default DiemDanhTab;
