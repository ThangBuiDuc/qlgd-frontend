"use client";
import Loading from "@/app/_hardComponents/loading";
import {
  getDaoTaoLichTrinhGiangDay,
  getDaoTaoLichTrinhGiangDayDaDuyet,
} from "@/ultis/daotao";
import { useQuery } from "@tanstack/react-query";
import LichDangKy from "./lichdangky";
import LichDaDuyet from "./lichdaduyet";

const DuyetDangKy = () => {
  const { data: danhSachChuaDuyet, isLoading: isLoading } = useQuery({
    queryKey: ["dao_tao_lich_trinh_giang_day"],
    queryFn: async () => getDaoTaoLichTrinhGiangDay(),
  });

  const { data: danhSachDaDuyet, isLoading: isLoading1 } = useQuery({
    queryKey: ["dao_tao_lich_trinh_giang_day_da_duyet"],
    queryFn: async () => getDaoTaoLichTrinhGiangDayDaDuyet(),
  });

  if (isLoading || isLoading1) return <Loading />;
  return (
    <div className="flex flex-col gap-4 w-full">
      <LichDangKy data={danhSachChuaDuyet} />
      <LichDaDuyet data={danhSachDaDuyet} isLoading={isLoading1} />
    </div>
  );
};

export default DuyetDangKy;
