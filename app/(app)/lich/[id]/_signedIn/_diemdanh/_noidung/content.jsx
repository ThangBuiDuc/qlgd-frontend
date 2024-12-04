"use client";

import Loading from "@/app/_hardComponents/loading";
import { getDiemDanhLop, getLichTrinhThucHien } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import ThongTin from "../_diemdanh/thongtin";
import Link from "next/link";

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

  return (
    <div className="flex flex-col gap-5">
      <ThongTin data={thongtin.info.lich} />
      <h5>Lịch trình thực hiện</h5>
      {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
      <div className="divide-y-1 pl-2">
        {lichtrinh?.map((item) => (
          <div key={item.id} className="pt-2 pb-2">
            <Link href={`/lich/${item.id}`}>
              Tuần {item.tuan}: {item.thoi_gian}
            </Link>
            <div dangerouslySetInnerHTML={{ __html: item.content_html }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoiDungTab;
