"use client";
import {
  capNhatNhomDiemLopGiangVien,
  themDauDiemNhomDiemGiangVien,
  xoaNhomDiemLopGiangVien,
} from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { Tooltip } from "@nextui-org/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings, CircleX, CirclePlus } from "lucide-react";
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

const AddModal = ({ isOpen, onChange, params, assignment_group_id }) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [isMutating, setIsMutating] = useState(false);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const mutation = useMutation({
    mutationFn: async () =>
      themDauDiemNhomDiemGiangVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        {
          assignment_group_id,
          name,
          points: score,
        },
        params.id
      ),
    onSuccess: () => {
      setName("");
      setScore("");
      onChange(false);
      setIsMutating(false);
      queryClient.invalidateQueries(["nhom_diem_lop", params.id]);
      toast.success("Thêm mới đầu điểm thành công!", {
        position: "top-center",
      });
    },
    onError: () => {
      setIsMutating(false);
      toast.error("Thêm mới đầu điểm không thành công!", {
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
              Thêm mới đầu điểm
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
                    Thêm mới
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

const UpdateModal = ({
  data,
  isOpen,
  onChange,
  params,
  assignment_group_id,
}) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [isMutating, setIsMutating] = useState(false);
  const [name, setName] = useState(data.name);
  const [score, setScore] = useState(data.weight);

  const mutation = useMutation({
    mutationFn: async () =>
      capNhatNhomDiemLopGiangVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        {
          assignment_group_id,
          name,
          weight: score,
        },
        params.id
      ),
    onSuccess: () => {
      onChange(false);
      setIsMutating(false);
      queryClient.invalidateQueries(["nhom_diem_lop", params.id]);
      toast.success("Cập nhật nhóm điểm thành công!", {
        position: "top-center",
      });
    },
    onError: () => {
      setIsMutating(false);
      toast.error("Cập nhật nhóm điểm không thành công!", {
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
              Cập nhật nhóm điểm
            </ModalHeader>
            <ModalBody>
              <Input
                variant="bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                label="Tên nhóm điểm"
                placeholder="Tên nhóm điểm"
              />
              <Input
                variant="bordered"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                type="number"
                label="Trọng số"
                placeholder="Trọng số"
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

const NhomDiem = ({ data, params, isActionable }) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
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
      {isActionable ? (
        <div className="flex gap-2">
          <>
            <Tooltip content="Thêm đầu điểm" color="primary" closeDelay={0}>
              <CirclePlus
                className="cursor-pointer"
                onClick={() => setAddModal(true)}
              />
            </Tooltip>
            <AddModal
              assignment_group_id={data.assignment_group_id}
              isOpen={addModal}
              onChange={setAddModal}
              params={params}
            />
          </>
          <>
            <Tooltip content="Sửa" color="success" closeDelay={0}>
              <Settings
                className="cursor-pointer"
                onClick={() => setUpdateModal(true)}
              />
            </Tooltip>
            <UpdateModal
              assignment_group_id={data.assignment_group_id}
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
                    title: "Thầy/Cô có chắc chắn muốn xoá nhóm điểm?",
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

export default NhomDiem;
