"use client";

import Loading from "@/app/_hardComponents/loading";
import { getDiemDanhLop, getLichTrinhThucHien } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import ThongTin from "../_diemdanh/thongtin";

const NoiDungTab = ({ params }) => {
  const { getToken } = useAuth();
  const { data: thongtin, isLoadingThongTin } = useQuery({
    queryKey: ["diem_danh_lich", params.id],
    queryFn: async () =>
      getDiemDanhLop(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id
      ),
  });

  const { data: lichtrinh, isLoadingLichTrinh } = useQuery({
    queryKey: ["lich_trinh", thongtin.info.lop.id],
    queryFn: async () =>
      getLichTrinhThucHien(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        thongtin.info.lop.id
      ),
    enabled: !!thongtin.info.lop.id,
  });

  if (isLoadingThongTin && isLoadingLichTrinh) return <Loading />;

  console.log(lichtrinh);

  return (
    <div className="flex flex-col gap-5">
      <ThongTin data={thongtin.info.lich} />
      <h5>Lịch trình thực hiện</h5>
      {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
    </div>
  );
};

export default NoiDungTab;
