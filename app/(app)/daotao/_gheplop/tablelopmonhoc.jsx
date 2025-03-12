"use client";
import Loading from "@/app/_hardComponents/loading";
import { getSinhVienLopMonHoc, xoaSinhVien } from "@/ultis/daotao";
import { useAuth } from "@clerk/nextjs";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import Swal from "sweetalert2";

const TableLopMonHoc = ({ selectedLopMonHoc, searchParams }) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: [
      "sinh_vien_lop_mon_hoc",
      selectedLopMonHoc?.value,
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getSinhVienLopMonHoc(
        {
          lop_id: selectedLopMonHoc?.value,
        },
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        { hocky: searchParams.get("hocky"), namhoc: searchParams.get("namhoc") }
      ),
    enabled: !!selectedLopMonHoc?.value,
  });

  const removeMutation = useMutation({
    mutationFn: async (data) =>
      xoaSinhVien(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        {
          lop_id: selectedLopMonHoc?.value,
          enrollment_id: data.id,
        }
      ),
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["lich_bo_sung", params.id]);
      queryClient.setQueryData(
        [
          "sinh_vien_lop_mon_hoc",
          selectedLopMonHoc?.value,
          searchParams.get("hocky"),
          searchParams.get("namhoc"),
        ],
        data
      );
      Swal.fire({
        title: "Xoá sinh viên khỏi lớp môn học thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Xoá sinh viên khỏi lớp môn học không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <Table
      isStriped
      aria-label="Sinh vien lop mon hoc"
      classNames={{
        th: ["!bg-[#006FEE]", "text-white"],
        //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
      }}
    >
      <TableHeader>
        <TableColumn>STT</TableColumn>
        <TableColumn>Mã sinh viên</TableColumn>
        <TableColumn>Họ và tên</TableColumn>
        <TableColumn>Tín chỉ?</TableColumn>
        <TableColumn>Xoá</TableColumn>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow
            key={item.id}
            className={`${
              item.bosung_status === "success" ? "!bg-green-200" : ""
            }`}
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.code}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.tinchi_status}</TableCell>
            <TableCell>
              {searchParams.get("hocky") && searchParams.get("namhoc") ? (
                <></>
              ) : (
                <Tooltip content="Xoá" color="warning" closeDelay={0}>
                  <CircleX
                    className="cursor-pointer"
                    onClick={() => {
                      Swal.fire({
                        title:
                          "Thầy/Cô có chắc chắn xoá sinh viên khỏi lớp môn học?",
                        icon: "warning",
                        confirmButtonColor: "#006FEE",
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Xác nhận",
                        cancelButtonText: "Huỷ",
                        showLoaderOnConfirm: true,
                        allowOutsideClick: () => !Swal.isLoading(),
                        preConfirm: async () =>
                          await removeMutation.mutateAsync({ id: item.id }),
                      });
                    }}
                  />
                </Tooltip>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableLopMonHoc;
