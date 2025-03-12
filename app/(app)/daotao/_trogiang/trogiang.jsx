import { useState } from "react";
import Content from "./content";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/_hardComponents/loading";
import Select from "react-select";
import { getDanhSachGiangVien } from "@/ultis/daotao";

const TroGiang = () => {
  const [lopMonHoc, setLopMonHoc] = useState(null);
  const searchParams = useSearchParams();
  //   const { getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: [
      "giang_viens",
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getDanhSachGiangVien({
        hocky: searchParams.get("hocky"),
        namhoc: searchParams.get("namhoc"),
      }),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <h5 className="self-center">Tìm lớp</h5>
        <Select
          value={lopMonHoc}
          onChange={setLopMonHoc}
          options={data?.lop_mon_hocs.map((item) => ({
            value: item.id,
            label: item.text,
          }))}
          placeholder="Tìm lớp môn học"
          className="w-[300px]"
        />
      </div>
      {lopMonHoc && (
        <Content lopMonHoc={lopMonHoc} giang_viens={data?.giang_viens} />
      )}
    </div>
  );
};

export default TroGiang;
