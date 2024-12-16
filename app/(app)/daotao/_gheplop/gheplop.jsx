"use client";

import { timLopHanhChinh, timLopMonHoc } from "@/ultis/daotao";
import { Button } from "@nextui-org/button";
// import AsyncSelect from "react-select/async";
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";

const GhepLop = () => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="grid grid-cols-5 auto-rows-auto gap-2">
      <div className="flex flex-col col-span-2">
        <h6>Chọn lớp hành chính</h6>
        <AsyncPaginate
          cacheOptions
          defaultOptions
          value={selected}
          onChange={setSelected}
          loadOptions={timLopHanhChinh}
          additional={{
            page: 1, // Initial page
          }}
          placeholder="Tìm lớp hành chính"
          noOptionsMessage={() => "Không tìm thấy kết quả"}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button color="success" className="w-fit">
          Chọn
        </Button>
        <Button color="primary" className="w-fit">
          Duyệt
        </Button>
      </div>
      <div className="flex flex-col col-span-2">
        <h6>Chọn lớp môn học</h6>
        {/* <AsyncPaginate
          cacheOptions
          defaultOptions
          loadOptions={timLopMonHoc}
          placeholder="Tìm lớp môn học"
          noOptionsMessage={() => "Không tìm thấy kết quả"}
        /> */}
      </div>
    </div>
  );
};

export default GhepLop;
