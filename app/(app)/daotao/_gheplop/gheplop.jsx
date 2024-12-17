"use client";

import { ghepLop, timLopHanhChinh, timLopMonHoc } from "@/ultis/daotao";
import { Button } from "@nextui-org/button";
// import AsyncSelect from "react-select/async";
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import TableLopHanhChinh from "./tablelophanhchinh";
import TableLopMonHoc from "./tablelopmonhoc";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";

const GhepLop = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [selectedLopHanhChinh, setSelectedLopHanhChinh] = useState(null);
  const [selectedLopMonHoc, setSelectedLopMonHoc] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const mutation = useMutation({
    mutationFn: async () =>
      ghepLop(
        {
          ma_lop_hanh_chinh: selectedLopHanhChinh.value,
          lop_id: selectedLopMonHoc.value,
          sinh_viens:
            selectedKeys === "all"
              ? queryClient
                  .getQueryData([
                    "sinh_vien_lop_hanh_chinh",
                    selectedLopHanhChinh?.value,
                  ])
                  .map((item) => item.id)
              : Array.from(selectedKeys).map((item) => parseInt(item)),
        },
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "sinh_vien_lop_mon_hoc",
        selectedLopMonHoc?.value,
      ]);
      setSelectedKeys(new Set([]));
      // queryClient.setQueryData(
      //   ["sinh_vien_lop_mon_hoc", selectedLopMonHoc?.value],
      //   data
      // );
      Swal.fire({
        title: "Ghép lớp thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Ghép lớp không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  return (
    <div className="grid grid-cols-5 auto-rows-auto gap-2">
      <div className="flex flex-col col-span-2 gap-2">
        <h6>Chọn lớp hành chính</h6>
        <AsyncPaginate
          cacheOptions
          defaultOptions
          value={selectedLopHanhChinh}
          onChange={setSelectedLopHanhChinh}
          loadOptions={timLopHanhChinh}
          additional={{
            page: 1, // Initial page
          }}
          placeholder="Tìm lớp hành chính"
          noOptionsMessage={() => "Không tìm thấy kết quả"}
        />
        {selectedLopHanhChinh && (
          <TableLopHanhChinh
            selectedLopHanhChinh={selectedLopHanhChinh}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        {/* <Button color="success" className="w-fit">
          Chọn
        </Button> */}
        <Button
          color="primary"
          className="w-fit"
          isDisabled={
            !selectedLopHanhChinh ||
            !selectedLopMonHoc ||
            selectedKeys.size === 0
          }
          onClick={() => {
            Swal.fire({
              title: "Thầy/Cô có chắc chắn muốn ghép lớp môn học?",
              icon: "warning",
              confirmButtonColor: "#006FEE",
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: "Xác nhận",
              cancelButtonText: "Huỷ",
              showLoaderOnConfirm: true,
              allowOutsideClick: () => !Swal.isLoading(),
              preConfirm: async () => await mutation.mutateAsync(),
            });
          }}
        >
          Chuyển
        </Button>
      </div>
      <div className="flex flex-col col-span-2 gap-2">
        <h6>Chọn lớp môn học</h6>
        <AsyncPaginate
          cacheOptions
          defaultOptions
          value={selectedLopMonHoc}
          onChange={setSelectedLopMonHoc}
          loadOptions={timLopMonHoc}
          additional={{
            page: 1, // Initial page
          }}
          placeholder="Tìm lớp môn học"
          noOptionsMessage={() => "Không tìm thấy kết quả"}
        />
        {selectedLopMonHoc && (
          <TableLopMonHoc selectedLopMonHoc={selectedLopMonHoc} />
        )}
      </div>
    </div>
  );
};

export default GhepLop;
