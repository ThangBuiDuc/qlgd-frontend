"use cliet";
import { useAuth } from "@clerk/clerk-react";
import { parseDate } from "@internationalized/date";
import { Tooltip } from "@nextui-org/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Settings,
  SquarePen,
  CircleX,
  ArchiveRestore,
  Undo2,
} from "lucide-react";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { DatePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Loading from "@/app/_hardComponents/loading";
// import { useParams } from "next/navigation";
import {
  capNhatLichDay,
  dangKyNghiLichDay,
  // huyHoanHanhLichDay,
  // phucHoiLichDay,
  // xoaLichDay,
} from "@/ultis/giang_vien";
import { toast } from "sonner";
import Swal from "sweetalert2";

const starts = [
  { key: "1", label: "1 (7h00)" },
  { key: "2", label: "2 (7h55)" },
  { key: "3", label: "3 (8h55)" },
  { key: "4", label: "4 (9h50)" },
  { key: "5", label: "5 (10h45)" },
  { key: "6", label: "6 (13h00)" },
  { key: "7", label: "7 (13h55)" },
  { key: "8", label: "8 (14h50)" },
  { key: "9", label: "9 (15h45)" },
  { key: "10", label: "10 (16h50)" },
  { key: "11", label: "11 (17h55)" },
  { key: "12", label: "12 (18h45)" },
  { key: "13", label: "13 (19h00)" },
  { key: "14", label: "14 (20h50)" },
  { key: "15", label: "15 (19h40)" },
  { key: "16", label: "16 (20h30)" },
];

const types = [
  { key: "lythuyet", label: "Lý thuyết" },
  { key: "thuchanh", label: "Thực hành" },
  { key: "tuhoc", label: "Tự học" },
  { key: "baitap", label: "Bài tập" },
];

const UpdateModal = ({ updateModal, setUpdateModal, data, params }) => {
  const queryClient = useQueryClient();
  const [date, setDate] = useState(
    parseDate(data.thoi_gian.split("/").reverse().join("-"))
  );
  const [start, setStart] = useState(new Set([`${data.tiet_bat_dau}`]));
  // const [note, setNote] = useState(data.note);
  const [type, setType] = useState(new Set([`lythuyet`]));
  const [quantity, setQuantity] = useState(data.so_tiet);
  const [room, setRoom] = useState(data.phong);
  const [isMutating, setIsMutating] = useState(false);
  const { getToken } = useAuth();
  // const params = useParams();

  const mutation = useMutation({
    mutationFn: async () =>
      capNhatLichDay(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        params.id,
        {
          // note,
          id: data.id,
          phong: room,
          so_tiet: quantity,
          ltype: [...type][0],
        }
      ),
    onSuccess: (data) => {
      // console.log(`respone: ${data}`);
      setUpdateModal(false);
      setIsMutating(false);
      // queryClient.invalidateQueries(["lich_trinh_lop", params.id]);
      queryClient.setQueryData(["lich_trinh_lop", params.id], data);
      // queryClient.invalidateQueries(["lop_chi_tiet_gv", params.id]);
      toast.success("Cập nhật lịch thành công!", {
        position: "top-center",
      });
    },
    onError: () => {
      setIsMutating(false);
      toast.error("Cập nhật lịch không thành công!", {
        position: "top-center",
      });
    },
  });

  return (
    <Modal
      isOpen={updateModal}
      onOpenChange={setUpdateModal}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <div className="flex flex-col justify-center">
            <ModalHeader className="flex flex-col gap-1">
              Cập nhật lịch dạy
            </ModalHeader>
            <ModalBody>
              <DatePicker
                isReadOnly
                label="Thời gian"
                // className="max-w-xs"
                variant="bordered"
                showMonthAndYearPickers
                value={date}
                onChange={setDate}
                // popoverProps={{ triggerScaleOnOpen: true }}
                classNames={{ calendar: "w-fit", calendarContent: "w-fit" }}
              />
              <Select
                isDisabled
                label="Tiết bắt đầu"
                // className="max-w-xs"
                variant="bordered"
                selectedKeys={start}
                onSelectionChange={setStart}
              >
                {starts.map((item) => (
                  <SelectItem key={item.key}>{item.label}</SelectItem>
                ))}
              </Select>
              <Input
                // className="max-w-xs"
                variant="bordered"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                label={`Số tiết dạy`}
                placeholder={`Số tiết dạy`}
              />
              <Input
                // className="max-w-xs"
                variant="bordered"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                type="text"
                label={`Phòng`}
                placeholder={`Phòng`}
              />
              <Select
                label="Loại"
                // className="max-w-xs"
                variant="bordered"
                selectedKeys={type}
                onSelectionChange={setType}
              >
                {types.map((item) => (
                  <SelectItem key={item.key}>{item.label}</SelectItem>
                ))}
              </Select>
              {/* <Input
                // className="max-w-xs"
                variant="bordered"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                type="text"
                label={`Ghi chú buổi dạy`}
                placeholder={`Ghi chú buổi dạy`}
              /> */}
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
                    isDisabled={
                      !date ||
                      start.size === 0 ||
                      !quantity ||
                      !room ||
                      type.size === 0
                    }
                  >
                    Cập nhật
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Huỷ
                  </Button>
                </>
              )}
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

const NghiDayModal = ({ nghiDayModal, setNghiDayModal, data, params }) => {
  const queryClient = useQueryClient();
  const [note, setNote] = useState(data.note);
  const [isMutating, setIsMutating] = useState(false);
  const { getToken } = useAuth();
  // const params = useParams();

  const mutation = useMutation({
    mutationFn: async () =>
      dangKyNghiLichDay(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        params.id,
        {
          note,
          id: data.id,
          lop_id: params.id,
        }
      ),
    onSuccess: (data) => {
      // console.log(`respone: ${data}`);
      setNghiDayModal(false);
      setIsMutating(false);
      // queryClient.invalidateQueries(["lich_trinh_lop", params.id]);
      queryClient.setQueryData(["lich_trinh_lop", params.id], data);
      // queryClient.invalidateQueries(["lop_chi_tiet_gv", params.id]);
      toast.success("Đăng ký nghỉ lịch dạy thành công!", {
        position: "top-center",
      });
    },
    onError: () => {
      setIsMutating(false);
      toast.error("Đăng ký nghỉ lịch dạy không thành công!", {
        position: "top-center",
      });
    },
  });

  return (
    <Modal
      isOpen={nghiDayModal}
      onOpenChange={setNghiDayModal}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <div className="flex flex-col justify-center">
            <ModalHeader className="flex flex-col gap-1">
              Đăng ký nghỉ dạy
            </ModalHeader>
            <ModalBody>
              <Input
                // className="max-w-xs"
                variant="bordered"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                type="text"
                label={`Lý do nghỉ dạy`}
                placeholder={`Lý do nghỉ dạy`}
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
                  >
                    Đăng ký
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Huỷ
                  </Button>
                </>
              )}
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

const Row = ({
  data,
  params,
  uncompleteMutation,
  removeMutation,
  restoreMutation,
}) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [nghiDayModal, setNghiDayModal] = useState(false);
  // const queryClient = useQueryClient();
  // const { getToken } = useAuth();
  // console.log(data);

  return (
    <>
      <div className="flex gap-2">
        {data.can_nghiday && (
          <>
            <Tooltip content="Đăng ký nghỉ" color="warning" closeDelay={0}>
              <SquarePen
                className="cursor-pointer"
                onClick={() => setNghiDayModal(true)}
              />
            </Tooltip>
            <NghiDayModal
              nghiDayModal={nghiDayModal}
              setNghiDayModal={setNghiDayModal}
              data={data}
              params={params}
            />
          </>
        )}
        {data.can_edit && (
          <>
            <Tooltip content="Sửa" color="success" closeDelay={0}>
              <Settings
                className="cursor-pointer"
                onClick={() => setUpdateModal(true)}
              />
            </Tooltip>
            <UpdateModal
              updateModal={updateModal}
              setUpdateModal={setUpdateModal}
              data={data}
              params={params}
            />
          </>
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
                  preConfirm: async () =>
                    await removeMutation.mutateAsync(data),
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
                  preConfirm: async () =>
                    await restoreMutation.mutateAsync(data),
                })
              }
            />
          </Tooltip>
        )}
        {data.can_uncomplete && (
          <>
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
            {/* <UncompleteModal
              uncompleteModal={uncompleteModal}
              setUncompleteModal={setUncompleteModal}
              data={data}
              params={params}
            /> */}
          </>
        )}
      </div>
    </>
  );
};

export default Row;
