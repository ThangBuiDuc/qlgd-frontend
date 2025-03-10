"use client";
import Loading from "@/app/_hardComponents/loading";
import { getLopMonHoc } from "@/ultis/daotao";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Select from "react-select";
import Content from "./content";
import { useSearchParams } from "next/navigation";
// import AsyncSelect from "react-select/async";

const TKB = () => {
  const searchParams = new useSearchParams();
  const { data: lops, isLoading } = useQuery({
    queryKey: [
      "danh_sach_lop",
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getLopMonHoc({
        hocky: searchParams.get("hocky"),
        namhoc: searchParams.get("namhoc"),
      }),
  });
  const [value, setValue] = useState(null);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-4 w-full">
      <Select
        className="w-[30%]"
        value={value}
        onChange={setValue}
        options={lops?.lops?.map((item) => ({
          value: item.id,
          label: item.text,
        }))}
        placeholder="Tìm lớp hành chính"
        noOptionsMessage={() => "Không tìm thấy kết quả"}
      />
      {value && (
        <Content
          value={value}
          tenant={{
            hocky: searchParams.get("hocky"),
            namhoc: searchParams.get("namhoc"),
          }}
        />
      )}
    </div>
  );
};

export default TKB;
