"use client";

import Loading from "@/app/_hardComponents/loading";
import { getNhomDiemLop } from "@/ultis/lop";
import { Button } from "@nextui-org/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import Diem from "./diem";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { themNhomDiemLopGiangVien } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import NhomDiem from "./nhomdiem";

const AddModal = ({ isOpen, onChange, params }) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [isMutating, setIsMutating] = useState(false);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const mutation = useMutation({
    mutationFn: async () =>
      themNhomDiemLopGiangVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        {
          name,
          weight: score,
        },
        params.id
      ),
    onSuccess: () => {
      setName("");
      setScore("");
      onChange(false);
      setIsMutating(false);
      queryClient.invalidateQueries(["nhom_diem_lop", params.id]);
      toast.success("Thêm mới nhóm điểm thành công!", {
        position: "top-center",
      });
    },
    onError: () => {
      setIsMutating(false);
      toast.error("Thêm mới nhóm điểm không thành công!", {
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
              Thêm mới nhóm điểm
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

const ThietLapNhomDiem = () => {
  const [addModal, setAddModal] = useState(false);

  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["nhom_diem_lop", params.id],
    queryFn: async () => getNhomDiemLop(params.id),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <Button
        color="primary"
        className="w-fit"
        onClick={() => setAddModal(true)}
      >
        Thêm
      </Button>
      <AddModal isOpen={addModal} onChange={setAddModal} params={params} />
      <div className="flex flex-col gap-3 divide-y-1">
        {data.map((item) => (
          <div
            key={item.assignment_group_id}
            className="pt-1 flex flex-col gap-3"
          >
            <NhomDiem data={item} params={params} />
            <div className="flex flex-col gap-1">
              {item.assignments.map((el) => (
                <Fragment key={el.assignment_id}>
                  <Diem data={el} params={params} />
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThietLapNhomDiem;
