"use client";
import { xoaNhomDiemLopGiangVien } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { Tooltip } from "@nextui-org/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings, CircleX, CirclePlus } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

const NhomDiem = ({ data, params }) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [addModal, setAddModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const deleteMutation = useMutation({
    mutationFn: async () =>
      xoaNhomDiemLopGiangVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        { assignment_group_id: data.assignment_group_id },
        params.id
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["nhom_diem_lop", params.id]);
      Swal.fire({
        title: "Xoá nhóm điểm thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Xoá nhóm điểm không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });
  return (
    <div className="flex justify-between">
      <h6>{`${data.name} (${data.weight}%)`} </h6>
      <div className="flex gap-2">
        <Tooltip content="Thêm đầu điểm" color="primary">
          <CirclePlus className="cursor-pointer" />
        </Tooltip>
        <Tooltip content="Sửa" color="success">
          <Settings className="cursor-pointer" />
        </Tooltip>
        {data.can_destroy && (
          <Tooltip content="Xoá" color="danger">
            <CircleX
              className="cursor-pointer"
              onClick={() => {
                Swal.fire({
                  title: "Thầy/Cô có chắc chắn muốn xoá nhóm điểm?",
                  icon: "warning",
                  confirmButtonColor: "#F31260",
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Xoá",
                  cancelButtonText: "Huỷ",
                  showLoaderOnConfirm: true,
                  allowOutsideClick: () => !Swal.isLoading(),
                  preConfirm: () => deleteMutation.mutate(),
                });
              }}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default NhomDiem;
