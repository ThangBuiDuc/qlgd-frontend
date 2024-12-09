"use cliet";
import { Tooltip } from "@nextui-org/tooltip";
import { CircleX, ArchiveRestore, Undo2 } from "lucide-react";
import Swal from "sweetalert2";

const RowBoSung = ({
  data,
  params,
  uncompleteMutation,
  removeMutation,
  restoreMutation,
}) => {
  return (
    <>
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
      {data.can_uncomplete && (
        <Tooltip content="Huỷ hoàn thành" color="primary" closeDelay={0}>
          <Undo2
            className="cursor-pointer"
            onClick={() =>
              Swal.fire({
                title: "Thầy/Cô có chắc chắn muốn huỷ hoàn thành lịch dạy?",
                icon: "warning",
                confirmButtonColor: "#F31260",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Huỷ hoàn thành",
                cancelButtonText: "Huỷ",
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: async () =>
                  await uncompleteMutation.mutateAsync(data),
              })
            }
          />
        </Tooltip>
      )}
    </>
  );
};

export default RowBoSung;
