"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { CircleCheckBig, CircleX, FileSearch2 } from "lucide-react";
import { Input } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  chapNhanLichDangKy,
  getKiemTraLichDangKyTrung,
  khongChapNhanLichDangKy,
} from "@/ultis/daotao";
import { useAuth } from "@clerk/nextjs";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import Loading from "@/app/_hardComponents/loading";
import { Button } from "@nextui-org/button";

const CheckModal = ({ modalIsOpen, setModalIsOpen, item }) => {
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["kiem_tra_trung_lich", item.id],
    queryFn: async () =>
      getKiemTraLichDangKyTrung(
        { id: item.id },
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    enabled: !!modalIsOpen,
  });

  return (
    <Modal
      isOpen={modalIsOpen}
      isDismissable={false}
      onOpenChange={setModalIsOpen}
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Kiểm tra trùng lịch
            </ModalHeader>
            <ModalBody>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <h6>Danh sách lịch trùng</h6>
                    <Table
                      aria-label="danh sach lich trung"
                      classNames={{
                        th: ["!bg-green-200", "text-black"],
                        tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
                      }}
                    >
                      <TableHeader>
                        <TableColumn>Tuần</TableColumn>
                        <TableColumn>Thời gian</TableColumn>
                        <TableColumn>Giảng viên</TableColumn>
                        <TableColumn>Phòng</TableColumn>
                        <TableColumn>Số tiết</TableColumn>
                        <TableColumn>Loại</TableColumn>
                        <TableColumn>Giờ học</TableColumn>
                      </TableHeader>
                      <TableBody emptyContent={"Hiện tại chưa có lịch trùng!"}>
                        {data?.lich?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.tuan}</TableCell>
                            <TableCell>{item.thoi_gian}</TableCell>
                            <TableCell>{item.giang_vien}</TableCell>
                            <TableCell>{item.phong}</TableCell>
                            <TableCell>{item.so_tiet}</TableCell>
                            <TableCell>{item.alias_state}</TableCell>
                            <TableCell>{item.type_status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h6>Danh sách sinh viên trùng</h6>
                    <Table
                      aria-label="danh sach sinh viên trung"
                      classNames={{
                        th: ["!bg-green-200", "text-black"],
                        tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
                      }}
                    >
                      <TableHeader>
                        <TableColumn>STT</TableColumn>
                        <TableColumn>Mã sinh viên</TableColumn>
                        <TableColumn>Họ và tên</TableColumn>
                        <TableColumn>Mã lớp hành chính</TableColumn>
                      </TableHeader>
                      <TableBody
                        emptyContent={"Hiện tại chưa có sinh viên trùng!"}
                      >
                        {data?.sinh_vien?.map((item, index) => (
                          <TableRow key={item.code}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.code}</TableCell>
                            <TableCell>{item.hovaten}</TableCell>
                            <TableCell>{item.ma_lop_hanh_chinh}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const RenderCell = ({ item, acceptMutation, denyMutation }) => {
  const [modalIsOpen, setModalIsOpen] = useState();
  return (
    <div className="flex gap-2">
      {item.alias_state === "Bổ sung" && (
        <>
          <Tooltip content="Kiểm tra" color="warning" closeDelay={0}>
            <FileSearch2
              className="cursor-pointer"
              onClick={() => setModalIsOpen(true)}
            />
          </Tooltip>
          <CheckModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            item={item}
          />
        </>
      )}
      <Tooltip content="Chấp nhận" color="primary" closeDelay={0}>
        <CircleCheckBig
          className="cursor-pointer"
          onClick={() => {
            Swal.fire({
              title: "Thầy/Cô có chắc chắn muốn chấp nhận lịch đăng ký?",
              icon: "warning",
              confirmButtonColor: "#006FEE",
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: "Xác nhận",
              cancelButtonText: "Huỷ",
              showLoaderOnConfirm: true,
              allowOutsideClick: () => !Swal.isLoading(),
              preConfirm: async () => await acceptMutation.mutateAsync(item),
            });
          }}
        />
      </Tooltip>
      <Tooltip content="Không chấp nhận" color="warning" closeDelay={0}>
        <CircleX
          className="cursor-pointer"
          onClick={() => {
            Swal.fire({
              title: "Thầy/Cô có chắc chắn muốn không chấp nhận lịch đăng ký?",
              icon: "warning",
              confirmButtonColor: "#006FEE",
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: "Xác nhận",
              cancelButtonText: "Huỷ",
              showLoaderOnConfirm: true,
              allowOutsideClick: () => !Swal.isLoading(),
              preConfirm: async () => await denyMutation.mutateAsync(item),
            });
          }}
        />
      </Tooltip>
    </div>
  );
};

const LichDangKy = ({ data }) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [rawData, setRawData] = useState(data);

  useEffect(() => {
    setRawData(data);
  }, [data]);

  const acceptMutation = useMutation({
    mutationFn: async (data) =>
      chapNhanLichDangKy(
        { id: data.id, phong: data.phong },
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["dao_tao_lich_trinh_giang_day"], data);
      queryClient.invalidateQueries(["dao_tao_lich_trinh_giang_day_da_duyet"]);
      Swal.fire({
        title: "Chấp nhận lịch đăng ký thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Chấp nhận lịch đăng ký không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const denyMutation = useMutation({
    mutationFn: async (data) =>
      khongChapNhanLichDangKy(
        data,
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["dao_tao_lich_trinh_giang_day"], data);
      Swal.fire({
        title: "Không chấp nhận lịch đăng ký thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Không chấp nhận lịch đăng ký không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <h5>Danh sách lịch đăng ký</h5>
      <Table
        aria-label="danh sach lich dang ky"
        classNames={{
          th: ["!bg-green-200", "text-black"],
          tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>Tuần</TableColumn>
          <TableColumn>Thời gian</TableColumn>
          <TableColumn>Thông tin</TableColumn>
          <TableColumn>Phòng</TableColumn>
          <TableColumn>Số tiết</TableColumn>
          <TableColumn>Loại</TableColumn>
          <TableColumn>Giờ học</TableColumn>
          <TableColumn>Lý do</TableColumn>
          <TableColumn>Thao tác</TableColumn>
        </TableHeader>
        <TableBody>
          {rawData?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.tuan}</TableCell>
              <TableCell>{item.thoi_gian}</TableCell>
              <TableCell>
                {item.giang_vien}
                <br />
                {item.ma_lop}
                <br />
                {item.ten_mon_hoc}
              </TableCell>
              <TableCell>
                {item.alias_state === "Bổ sung" ? (
                  <Input
                    variant="faded"
                    placeholder="Phòng"
                    value={item.phong}
                    onValueChange={(value) =>
                      setRawData((pre) =>
                        pre.map((el) =>
                          item.id === el.id ? { ...item, phong: value } : el
                        )
                      )
                    }
                  />
                ) : (
                  item.phong
                )}
              </TableCell>
              <TableCell>{item.so_tiet}</TableCell>
              <TableCell>{item.alias_state}</TableCell>
              <TableCell>{item.type_status}</TableCell>
              <TableCell>{item.note}</TableCell>
              <TableCell>
                <RenderCell
                  item={item}
                  acceptMutation={acceptMutation}
                  denyMutation={denyMutation}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LichDangKy;
