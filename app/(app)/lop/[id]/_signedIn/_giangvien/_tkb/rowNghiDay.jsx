"use cliet";
import { huyDangKyNghiLichDay } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/clerk-react";
import { Tooltip } from "@nextui-org/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleX, ArchiveRestore, PenOff } from "lucide-react";
import Swal from "sweetalert2";

const RowNghiDay = ({ data, params, removeMutation, restoreMutation }) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const unNghiDayMutation = useMutation({
    mutationFn: async (data) =>
      huyDangKyNghiLichDay(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id,
        { id: data.id, lop_id: params.id, note: "" }
      ),
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["lich_bo_sung", params.id]);
      queryClient.setQueryData(["lich_trinh_lop", params.id], data);
      Swal.fire({
        title: "Huỷ đăng ký nghỉ lịch dạy thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Huỷ đăng ký nghỉ lịch dạy không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  return (
    <div className="flex gap-2">
      {data.can_unnghiday && (
        <Tooltip content="Huỷ đăng ký nghỉ" color="primary" closeDelay={0}>
          <PenOff
            className="cursor-pointer"
            onClick={() =>
              Swal.fire({
                title: "Thầy/Cô có chắc chắn muốn huỷ đăng ký nghỉ lịch dạy?",
                icon: "warning",
                confirmButtonColor: "#F31260",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Huỷ đăng ký",
                cancelButtonText: "Huỷ",
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: async () =>
                  await unNghiDayMutation.mutateAsync(data),
              })
            }
          />
        </Tooltip>
      )}
      {data.can_remove && (
        <Tooltip content="Xoá" color="danger" closeDelay={0}>
          <CircleX
            className="cursor-pointer"
            onClick={() =>
              Swal.fire({
                title: "Thầy/Cô có chắc chắn muốn xoá lịch dạy?",
                icon: "warning",
                confirmButtonColor: "#F31260",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Xoá",
                cancelButtonText: "Huỷ",
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: async () => await removeMutation.mutateAsync(data),
              })
            }
          />
        </Tooltip>
      )}
      {data.can_restore && (
        <Tooltip content="Phục hồi" closeDelay={0}>
          <ArchiveRestore
            className="cursor-pointer"
            onClick={() =>
              Swal.fire({
                title: "Thầy/Cô có chắc chắn muốn phục hồi lịch dạy?",
                icon: "warning",
                confirmButtonColor: "#F31260",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Phục hồi",
                cancelButtonText: "Huỷ",
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: async () => await restoreMutation.mutateAsync(data),
              })
            }
          />
        </Tooltip>
      )}
    </div>
  );
};

export default RowNghiDay;
