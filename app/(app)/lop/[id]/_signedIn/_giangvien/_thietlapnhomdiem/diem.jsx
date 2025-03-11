"use client";
import { Tooltip } from "@nextui-org/tooltip";
import { Settings, CircleX } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";
import Loading from "@/app/_hardComponents/loading";
import {
  capNhatDauDiemNhomDiemGiangVien,
  xoaDauDiemNhomDiemGiangVien,
} from "@/ultis/giang_vien";

const UpdateModal = ({ data, isOpen, onChange, params }) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [isMutating, setIsMutating] = useState(false);
  const [name, setName] = useState(data.name);
  const [score, setScore] = useState(data.points);

  const mutation = useMutation({
    mutationFn: async () =>
      capNhatDauDiemNhomDiemGiangVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        {
          assignment_id: data.assignment_id,
          name,
          points: score,
        },
        params.id
      ),
    onSuccess: () => {
      onChange(false);
      setIsMutating(false);
      queryClient.invalidateQueries(["nhom_diem_lop", params.id]);
      toast.success("Cập nhật đầu điểm thành công!", {
        position: "top-center",
      });
    },
    onError: () => {
      setIsMutating(false);
      toast.error("Cập nhật đầu điểm không thành công!", {
        position: "top-center",
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onChange} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Cập nhật đầu điểm
            </ModalHeader>
            <ModalBody>
              <Input
                variant="bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                label="Tên đầu điểm"
                placeholder="Tên đầu điểm"
              />
              <Input
                variant="bordered"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                type="number"
                label="Điểm tối đa"
                placeholder="Điểm tối đa"
              />
            </ModalBody>
            <ModalFooter>
              {isMutating ? (
                <Loading size={"sm"} />
              ) : (
                <>
                  <Button
                    color="primary"
                    onClick={() => {
                      setIsMutating(true);
                      mutation.mutate();
                    }}
                    isDisabled={!Number(score) || score <= 0 || !name.trim()}
                  >
                    Cập nhật
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Huỷ
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const Diem = ({ data, params, isActionable }) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [updateModal, setUpdateModal] = useState(false);
  const deleteMutation = useMutation({
    mutationFn: async () =>
      xoaDauDiemNhomDiemGiangVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        { assignment_id: data.assignment_id },
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
    <div className="pl-2 flex justify-between">
      <p>
        {`${data.name}, điểm tối đa: `}{" "}
        <span className="font-semibold">{data.points}</span>
      </p>
      {isActionable ? (
        <div className="flex gap-2">
          <>
            <Tooltip content="Sửa" color="success" closeDelay={0}>
              <Settings
                className="cursor-pointer"
                onClick={() => setUpdateModal(true)}
              />
            </Tooltip>
            <UpdateModal
              data={data}
              isOpen={updateModal}
              onChange={setUpdateModal}
              params={params}
            />
          </>
          {data.can_destroy && (
            <Tooltip content="Xoá" color="danger" closeDelay={0}>
              <CircleX
                className="cursor-pointer"
                onClick={() => {
                  Swal.fire({
                    title: "Thầy/Cô có chắc chắn muốn xoá đầu điểm?",
                    icon: "warning",
                    confirmButtonColor: "#F31260",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Xoá",
                    cancelButtonText: "Huỷ",
                    showLoaderOnConfirm: true,
                    allowOutsideClick: () => !Swal.isLoading(),
                    preConfirm: async () => await deleteMutation.mutateAsync(),
                  });
                }}
              />
            </Tooltip>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Diem;
