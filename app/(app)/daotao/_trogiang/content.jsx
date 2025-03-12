"use client";

import Loading from "@/app/_hardComponents/loading";
import {
  capNhatGiangVienLopMonHoc,
  getThongTinTroGiang,
  themGiangVienLopMonHoc,
  xoaGiangVienLopMonHoc,
} from "@/ultis/daotao";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { memo, useState } from "react";
import Select from "react-select";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import Swal from "sweetalert2";
import { Tooltip } from "@nextui-org/tooltip";
import { CircleX } from "lucide-react";
import { Repeat2 } from "lucide-react";

const RenderCell = ({ data, deleteMutation, updateMutation }) => {
  return (
    <div className="flex gap-2">
      <Tooltip
        content={data.trogiang ? "Chuyển giảng viên chính" : "Chuyển trợ giảng"}
        color="primary"
        closeDelay={0}
      >
        <Repeat2
          className="cursor-pointer"
          onClick={() => {
            Swal.fire({
              title:
                "Thầy/Cô có chắc chắn muốn cập nhật giảng viên chính/Trợ giảng của giảng viên cho lớp môn học?",
              icon: "question",
              confirmButtonColor: "#006FEE",
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: "Chuyển",
              cancelButtonText: "Huỷ",
              showLoaderOnConfirm: true,
              allowOutsideClick: () => !Swal.isLoading(),
              preConfirm: async () =>
                await updateMutation.mutateAsync({
                  id: data.id,
                  trogiang: data.trogiang ? false : true,
                }),
            });
          }}
        />
      </Tooltip>
      <Tooltip content="Xoá" color="danger" closeDelay={0}>
        <CircleX
          className="cursor-pointer"
          onClick={() => {
            Swal.fire({
              title:
                "Thầy/Cô có chắc chắn muốn xoá giảng viên cho lớp môn học?",
              icon: "warning",
              confirmButtonColor: "#F31260",
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: "Xoá",
              cancelButtonText: "Huỷ",
              showLoaderOnConfirm: true,
              allowOutsideClick: () => !Swal.isLoading(),
              preConfirm: async () => await deleteMutation.mutateAsync(data),
            });
          }}
        />
      </Tooltip>
    </div>
  );
};

const Content = ({ lopMonHoc, giang_viens }) => {
  const queryClient = useQueryClient();
  //   const [isMutating, setIsMutating] = useState(false);
  const [giangVien, setGiangVien] = useState(null);
  const { getToken } = useAuth();
  const searchParams = useSearchParams();
  const isActionable =
    searchParams.get("hocky") && searchParams.get("namhoc") ? false : true;
  const { data, isLoading } = useQuery({
    queryKey: [
      "tro_giang_lop_mon_hoc",
      lopMonHoc?.value,
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getThongTinTroGiang(
        lopMonHoc?.value,
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        { hocky: searchParams.get("hocky"), namhoc: searchParams.get("namhoc") }
      ),
    enabled: !!lopMonHoc?.value,
  });

  const addMutation = useMutation({
    mutationFn: async () =>
      themGiangVienLopMonHoc(
        lopMonHoc?.value,
        { giang_vien_id: giangVien.value },
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    onSuccess: (data) => {
      setGiangVien(null);
      queryClient.setQueryData(
        [
          "tro_giang_lop_mon_hoc",
          lopMonHoc?.value,
          searchParams.get("hocky"),
          searchParams.get("namhoc"),
        ],
        data
      );
      Swal.fire({
        title: "Thêm giảng viên thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Thêm giảng viên không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data) =>
      capNhatGiangVienLopMonHoc(
        lopMonHoc?.value,
        data,
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [
          "tro_giang_lop_mon_hoc",
          lopMonHoc?.value,
          searchParams.get("hocky"),
          searchParams.get("namhoc"),
        ],
        data
      );
      Swal.fire({
        title: "Cập nhật giảng viên thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Cập nhật giảng viên không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (data) =>
      xoaGiangVienLopMonHoc(
        lopMonHoc?.value,
        data,
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [
          "tro_giang_lop_mon_hoc",
          lopMonHoc?.value,
          searchParams.get("hocky"),
          searchParams.get("namhoc"),
        ],
        data
      );
      Swal.fire({
        title: "Xoá giảng viên thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Xoá giảng viên không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex gap-2">
        <h5 className="self-center">Tìm giảng viên</h5>
        <Select
          value={giangVien}
          onChange={setGiangVien}
          options={giang_viens
            ?.filter(
              (item) => !data?.some((el) => el.giang_vien_id === item.id)
            )
            .map((item) => ({
              value: item.id,
              label: item.text,
            }))}
          placeholder="Tìm giảng viên"
          className="w-[300px]"
        />
        <Button
          color="primary"
          isDisabled={!isActionable || !giangVien}
          onClick={() => {
            Swal.fire({
              title:
                "Thầy/Cô có chắc chắn muốn thêm giảng viên cho lớp môn học?",
              icon: "warning",
              confirmButtonColor: "#006FEE",
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: "Xác nhận",
              cancelButtonText: "Huỷ",
              showLoaderOnConfirm: true,
              allowOutsideClick: () => !Swal.isLoading(),
              preConfirm: async () => await addMutation.mutateAsync(),
            });
          }}
        >
          Thêm giảng viên
        </Button>
      </div>
      <Table
        isStriped
        aria-label="Giang vien lop mon hoc"
        classNames={{
          th: ["!bg-[#006FEE]", "text-white"],
          // //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>STT</TableColumn>
          <TableColumn>Giảng viên</TableColumn>
          <TableColumn>Mã giảng viên</TableColumn>
          <TableColumn>Trợ giảng?</TableColumn>
          <TableColumn>Thao tác</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.hovaten}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>
                {item.trogiang === true ? "Trợ giảng" : "Giảng viên chính"}
              </TableCell>
              <TableCell>
                {isActionable && (
                  <RenderCell
                    data={item}
                    deleteMutation={deleteMutation}
                    updateMutation={updateMutation}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default memo(Content);
