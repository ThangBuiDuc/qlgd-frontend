"use client";
import Loading from "@/app/_hardComponents/loading";
import {
  getDaoTaoLichTrinhGiangDay,
  getDaoTaoLichTrinhGiangDayDaDuyet,
} from "@/ultis/daotao";
import { useQuery } from "@tanstack/react-query";
import LichDangKy from "./lichdangky";
import LichDaDuyet from "./lichdaduyet";
import { useSearchParams } from "next/navigation";

const DuyetDangKy = () => {
  const searchParams = useSearchParams();
  const { data: danhSachChuaDuyet, isLoading: isLoading } = useQuery({
    queryKey: [
      "dao_tao_lich_trinh_giang_day",
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getDaoTaoLichTrinhGiangDay({
        hocky: searchParams.get("hocky"),
        namhoc: searchParams.get("namhoc"),
      }),
  });

  const { data: danhSachDaDuyet, isLoading: isLoading1 } = useQuery({
    queryKey: [
      "dao_tao_lich_trinh_giang_day_da_duyet",
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getDaoTaoLichTrinhGiangDayDaDuyet({
        hocky: searchParams.get("hocky"),
        namhoc: searchParams.get("namhoc"),
      }),
  });

  if (isLoading || isLoading1) return <Loading />;
  return (
    <div className="flex flex-col gap-4 w-full">
      <LichDangKy
        data={danhSachChuaDuyet}
        tenant={{
          hocky: searchParams.get("hocky"),
          namhoc: searchParams.get("namhoc"),
        }}
      />
      <LichDaDuyet data={danhSachDaDuyet} isLoading={isLoading1} />
    </div>
  );
};

export default DuyetDangKy;
