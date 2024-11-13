"use client";

import { getLichTrinhGiangVien } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const TKB = () => {
  const { userId, getToken } = useAuth();
  const { data } = useQuery({
    queryKey: `lich_trinh_${userId}`,
    queryFn: async () =>
      getLichTrinhGiangVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV })
      ),
  });

  console.log(data);

  return <div>TKB</div>;
};

export default TKB;
