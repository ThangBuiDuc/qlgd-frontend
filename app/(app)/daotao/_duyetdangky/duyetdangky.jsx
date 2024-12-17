"use client";
import Loading from "@/app/_hardComponents/loading";
import { getDaoTaoLichTrinhGiangDay } from "@/ultis/daotao";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LichDangKy from "./lichdangky";

const DuyetDangKy = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dao_tao_lich_trinh_giang_day"],
    queryFn: async () => getDaoTaoLichTrinhGiangDay(),
  });

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col gap-4 w-full">
      <LichDangKy data={data} />
    </div>
  );
};

export default DuyetDangKy;
