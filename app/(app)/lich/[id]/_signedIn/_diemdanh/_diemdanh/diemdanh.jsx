"use client";
import Loading from "@/app/_hardComponents/loading";
import { capNhatDiemDanhHocSinh } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { CircleMinus } from "lucide-react";
import { Input } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { NotebookPen } from "lucide-react";
import { toast } from "sonner";
const DisableTable = ({ data }) => {
  // console.log(data);
  return (
    <Table
      isStriped
      aria-label="Thong tin buoi hoc"
      classNames={{
        th: ["!bg-[#006FEE]", "text-white"],
        tr: ["even:bg-[#f2dede]"],
      }}
    >
      <TableHeader>
        <TableColumn>STT</TableColumn>
        <TableColumn>Sinh viên</TableColumn>
        <TableColumn>Tình hình đi học</TableColumn>
        <TableColumn>Vắng</TableColumn>
        <TableColumn>Số tiết vắng</TableColumn>
        <TableColumn>Phép</TableColumn>
        <TableColumn>Bắt buộc tham dự</TableColumn>
        <TableColumn>Ghi chú</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {item.name}
              <br />
              {`(${item.code})`}
            </TableCell>
            <TableCell>
              <div className="h-[20px] flex">
                <div
                  className="bg-green-500  text-white text-center rounded-l-sm"
                  style={{ width: 100 - item.tinhhinh + "%" }}
                >
                  <span>{100 - item.tinhhinh + "%"}</span>
                </div>
                <div
                  className=" bg-red-500 overflow-hidden text-center text-white  rounded-r-sm"
                  style={{
                    width: item.tinhhinh ? item.tinhhinh + "%" : 0,
                  }}
                >
                  <span>{item.tinhhinh + "%"}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <X />
            </TableCell>
            <TableCell>
              <X />
            </TableCell>
            <TableCell>
              <X />
            </TableCell>
            <TableCell>
              <X />
            </TableCell>
            <TableCell>
              <X />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const NoteModal = ({
  noteModal,
  data,
  setIsMutaion,
  isMutation,
  setNoteModal,
}) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const params = useParams();
  const [content, setContent] = useState(data.note ? data.note : "");
  const mutation = useMutation({
    mutationFn: async (data) =>
      capNhatDiemDanhHocSinh(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id,
        data
      ),
    onSuccess: (data) => {
      setIsMutaion(false);
      setNoteModal(false);
      toast.success("Cập nhật ghi chú thành công!", {
        position: "top-center",
      });
      // queryClient.invalidateQueries(["diem_danh_lich", params.id]);
      queryClient.setQueryData(["diem_danh_lich", params.id], data);
    },
    onError: () => {
      setIsMutaion(false);
      setNoteModal(false);
      toast.success("Cập nhật ghi chú không thành công!", {
        position: "top-center",
      });
    },
  });
  return (
    <Modal isOpen={noteModal} isDismissable={false} onOpenChange={setNoteModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Cập nhật ghi chú sinh viên {data.name}
            </ModalHeader>
            <ModalBody>
              <Input
                placeholder="Ghi chú"
                variant="bordered"
                value={content}
                onValueChange={setContent}
                classNames={{ inputWrapper: "border border-black" }}
              />
            </ModalBody>
            <ModalFooter>
              {isMutation ? (
                <Loading />
              ) : (
                <>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Huỷ
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      setIsMutaion(true);
                      mutation.mutate({
                        enrollment: { ...data, note: content },
                        stat: "note",
                        lich_id: params.id,
                      });
                    }}
                  >
                    Cập nhật
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

const RenderCell = ({ data, setIsMutaion, isMutation, isActionable }) => {
  const [noteModal, setNoteModal] = useState(false);
  return (
    isActionable && (
      <>
        <Tooltip color="primary" content="Cập nhật ghi chú" closeDelay={0}>
          <NotebookPen
            className="cursor-pointer"
            onClick={() => setNoteModal(true)}
          />
        </Tooltip>
        <NoteModal
          setNoteModal={setNoteModal}
          noteModal={noteModal}
          data={data}
          isMutation={isMutation}
          setIsMutaion={setIsMutaion}
        />
      </>
    )
  );
};

const Editable = ({ data, so_tiet, isActionable }) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const { getToken } = useAuth();
  const [isMutation, setIsMutaion] = useState(false);
  const mutation = useMutation({
    mutationFn: async (data) =>
      capNhatDiemDanhHocSinh(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id,
        data
      ),
    onSuccess: (data) => {
      setIsMutaion(false);
      // queryClient.invalidateQueries(["diem_danh_lich", params.id]);
      queryClient.setQueryData(["diem_danh_lich", params.id], data);
    },
    onError: () => {
      setIsMutaion(false);
    },
  });
  var css = {
    "Đang học": "success",
    Vắng: "danger",
    Trễ: "warning",
    x: "default",
  };
  var phep = {
    Có: "success",
    Không: "danger",
    x: "default",
  };
  var idle = {
    Có: "success",
    Không: "danger",
  };
  return (
    <Table
      isStriped
      aria-label="Thong tin buoi hoc"
      classNames={{
        th: ["!bg-[#006FEE]", "text-white"],
        tr: ["even:bg-[#f2dede]"],
      }}
    >
      <TableHeader>
        <TableColumn>STT</TableColumn>
        <TableColumn>Sinh viên</TableColumn>
        <TableColumn>Tình hình đi học</TableColumn>
        <TableColumn>Vắng</TableColumn>
        <TableColumn>Số tiết vắng</TableColumn>
        <TableColumn>Phép</TableColumn>
        <TableColumn>Bắt buộc tham dự</TableColumn>
        <TableColumn>Ghi chú</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {item.name}
              <br />
              {`(${item.code})`}
            </TableCell>
            <TableCell>
              <div className="h-[20px] flex">
                <div
                  className="bg-green-500  text-white text-center rounded-l-sm"
                  style={{ width: 100 - item.tinhhinh + "%" }}
                >
                  <span>{100 - item.tinhhinh + "%"}</span>
                </div>
                <div
                  className=" bg-red-500 overflow-hidden text-center text-white  rounded-r-sm"
                  style={{
                    width: item.tinhhinh ? item.tinhhinh + "%" : 0,
                  }}
                >
                  <span>{item.tinhhinh + "%"}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  setIsMutaion(true);
                  mutation.mutate({
                    enrollment: item,
                    stat: "vang",
                    lich_id: params.id,
                  });
                }}
                color={`${css[item.status]}`}
                isDisabled={
                  !isActionable ||
                  item.idle_status === "Không" ||
                  item.status === "Trễ"
                    ? true
                    : false
                }
              >
                {isMutation ? <Loading size={"sm"} /> : item.status}
              </Button>
            </TableCell>
            <TableCell className="flex items-center gap-2">
              {isMutation ? (
                <Loading size={"sm"} />
              ) : (
                <>
                  {isActionable && (
                    <CirclePlus
                      onClick={
                        item.so_tiet_vang < so_tiet
                          ? () => {
                              setIsMutaion(true);
                              mutation.mutate({
                                enrollment: item,
                                stat: "plus",
                                lich_id: params.id,
                              });
                            }
                          : undefined
                      }
                      className={`${
                        item.so_tiet_vang === so_tiet
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                  )}
                  {item.so_tiet_vang}
                  {isActionable && (
                    <CircleMinus
                      onClick={
                        item.so_tiet_vang > 0
                          ? () => {
                              setIsMutaion(true);
                              mutation.mutate({
                                enrollment: item,
                                stat: "minus",
                                lich_id: params.id,
                              });
                            }
                          : undefined
                      }
                      className={`${
                        item.so_tiet_vang === 0
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                  )}
                </>
              )}
            </TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  setIsMutaion(true);
                  mutation.mutate({
                    enrollment: item,
                    stat: "phep",
                    lich_id: params.id,
                  });
                }}
                color={`${phep[item.phep_status]}`}
                isDisabled={
                  !isActionable ||
                  item.idle_status === "Không" ||
                  item.so_tiet_vang === 0
                    ? true
                    : false
                }
              >
                {isMutation ? <Loading size={"sm"} /> : item.phep_status}
              </Button>
            </TableCell>
            <TableCell>
              <Button
                isDisabled={!isActionable}
                onClick={() => {
                  setIsMutaion(true);
                  mutation.mutate({
                    enrollment: item,
                    stat: "idle",
                    lich_id: params.id,
                  });
                }}
                color={`${idle[item.idle_status]}`}
              >
                {isMutation ? <Loading size={"sm"} /> : item.idle_status}
              </Button>
            </TableCell>
            <TableCell>
              <RenderCell
                isActionable={isActionable}
                data={item}
                isMutation={isMutation}
                setIsMutaion={setIsMutaion}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const DiemDanh = ({ data, state, so_tiet, isActionable }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <p>Thông tin điểm danh:</p>
        {state ? (
          <Editable data={data} so_tiet={so_tiet} isActionable={isActionable} />
        ) : (
          <DisableTable data={data} />
        )}
      </div>
    </div>
  );
};

export default DiemDanh;
