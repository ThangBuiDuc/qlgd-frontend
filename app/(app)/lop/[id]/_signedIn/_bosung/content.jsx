"use client";

import { dangKyLichBoSung, getLichBoSungLop } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
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
import Loading from "@/app/_hardComponents/loading";
import { toast } from "sonner";
import moment from "moment";

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

const AddModal = ({ isOpen, onChange, params }) => {
  const queryClient = useQueryClient();
  const [date, setDate] = useState();
  const [start, setStart] = useState(new Set(["1"]));
  const [type, setType] = useState(new Set(["lythuyet"]));
  const [quantity, setQuantity] = useState("");
  const [room, setRoom] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async () =>
      dangKyLichBoSung(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        params.id,
        {
          id: params.id,
          tiet_bat_dau: [...start][0],
          thoi_gian: moment(date).format("DD/MM/yyyy"),
          phong: room,
          so_tiet: quantity,
          ltype: [...type][0],
        }
      ),
    onSuccess: () => {
      setDate();
      setStart(new Set(["1"]));
      setType(new Set(["lythuyet"]));
      setQuantity("");
      setRoom("");
      onChange(false);
      setIsMutating(false);
      queryClient.invalidateQueries(["lich_bo_sung", params.id]);
      // queryClient.invalidateQueries(["lop_chi_tiet_gv", params.id]);
      toast.success("Đăng ký bổ sung thành công!", {
        position: "top-center",
      });
    },
    onError: () => {
      setIsMutating(false);
      toast.error("Đăng ký bổ sung không thành công!", {
        position: "top-center",
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onChange} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <div className="flex flex-col justify-center">
            <ModalHeader className="flex flex-col gap-1">
              Đăng ký dạy bổ sung
            </ModalHeader>
            <ModalBody>
              <DatePicker
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

const BoSung = () => {
  const [addModal, setAddModal] = useState(false);
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["lich_bo_sung", params.id],
    queryFn: async () =>
      getLichBoSungLop(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id
      ),
  });

  console.log(data);
  if (isLoading) return <Spinner color="primary" />;

  return (
    <div className="flex flex-col gap-4">
      <>
        <Button
          color="success"
          className="w-fit "
          onClick={() => setAddModal(true)}
        >
          Đăng ký bổ sung
        </Button>
        <AddModal isOpen={addModal} onChange={setAddModal} params={params} />
      </>
      <Table
        aria-label="Danh sach lop"
        isStriped
        classNames={{
          th: ["!bg-green-200", "text-black"],
          // tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>STT</TableColumn>
          <TableColumn>Thời gian</TableColumn>
          <TableColumn>Tiết bắt đầu</TableColumn>
          <TableColumn>Số tiết</TableColumn>
          <TableColumn>Phòng</TableColumn>
          <TableColumn>Loại</TableColumn>
          <TableColumn>Trạng thái</TableColumn>
          {/* <TableColumn></TableColumn> */}
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.thoi_gian}</TableCell>
              <TableCell>{item.tiet_bat_dau}</TableCell>
              <TableCell>{item.so_tiet}</TableCell>
              <TableCell>{item.phong}</TableCell>
              <TableCell>{item.type_status}</TableCell>
              <TableCell>{item.alias_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BoSung;
