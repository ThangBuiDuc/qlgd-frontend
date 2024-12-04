"use client";

import Loading from "@/app/(app)/loading";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const DeCuongDuKien = ({ params }) => {
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

  if (isLoading) return <Loading />;
  return (
    <>
      <h5>Đề cương chi tiết</h5>
      <div
        dangerouslySetInnerHTML={{
          __html: data?.info.lop.de_cuong_chi_tiet_html,
        }}
        className="pl-2"
      />
    </>
  );
};

export default DeCuongDuKien;
