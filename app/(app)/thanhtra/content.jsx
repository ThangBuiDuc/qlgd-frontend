"use client";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  baoCao,
  boTiet,
  diMuon,
  getLichTrinhGiangDay,
  veSom,
} from "@/ultis/thanhtra";
import Loading from "@/app/_hardComponents/loading";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import {
  ArchiveRestore,
  CircleCheckBig,
  CircleX,
  MessageCircleWarning,
  Save,
  Settings,
  Undo2,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import Swal from "sweetalert2";

const TableContent = ({ data, isLoading, date }) => {
  const [note1, setNote1] = useState(data?.note1);
  const [note3, setNote3] = useState(data?.note3);
  const [isEdit, setIsEdit] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  //   console.log(data);
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const diMuonMutation = useMutation({
    mutationFn: async (data) =>
      diMuon(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        { lich_id: data.id, date: data.date }
      ),
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["lich_bo_sung", params.id]);
      queryClient.setQueryData(["thanh_tra_lich_trinh", date], data);
      Swal.fire({
        title: "Đánh dấu Muộn/Không Muộn thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Đánh dấu Muộn/Không Muộn không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const veSomMutation = useMutation({
    mutationFn: async (data) =>
      veSom(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        { lich_id: data.id, date: data.date }
      ),
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["lich_bo_sung", params.id]);
      queryClient.setQueryData(["thanh_tra_lich_trinh", date], data);
      Swal.fire({
        title: "Đánh dấu Về Sớm/Không Về Sớm thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Đánh dấu Về Sớm/Không Về Sớm không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const boTietMutation = useMutation({
    mutationFn: async (data) =>
      boTiet(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        { lich_id: data.id, date: data.date }
      ),
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["lich_bo_sung", params.id]);
      queryClient.setQueryData(["thanh_tra_lich_trinh", date], data);
      Swal.fire({
        title: "Đánh dấu Bỏ Tiết/Không Bỏ Tiết thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Đánh dấu Bỏ Tiết/Không Bỏ Tiết không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const reportMutation = useMutation({
    mutationFn: async (data) =>
      baoCao(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        {
          lich_id: data.id,
          date: data.date,
        }
      ),
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["lich_bo_sung", params.id]);
      queryClient.setQueryData(["thanh_tra_lich_trinh", date], data);
      Swal.fire({
        title: "Báo cáo thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Báo cáo không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  return (
    <Table
      aria-label="Danh sach lich day"
      isStriped
      classNames={{
        th: ["!bg-green-200", "text-black"],
        tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
      }}
    >
      <TableHeader>
        <TableColumn>STT</TableColumn>
        <TableColumn>Giờ học</TableColumn>
        <TableColumn>Báo lỗi</TableColumn>
        <TableColumn>Note 1</TableColumn>
        <TableColumn>Note 2</TableColumn>
        <TableColumn>Note 3</TableColumn>
        <TableColumn>Thao tác</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Loading />}
        emptyContent={`${
          date
            ? "Hiện tại chưa có lịch dạy cho ngày đang chọn!"
            : "Vui lòng chọn ngày!"
        }`}
      >
        {data?.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <div className="gap-2 flex">
                <p className="w-[30%]">Thời gian:</p>
                <p className="w-[70%]">{item.info.thoi_gian}</p>
              </div>
              <div className="gap-2 flex">
                <p className="w-[30%]">Giảng viên:</p>
                <p className="w-[70%]">{item.info.giang_vien}</p>
              </div>
              <div className="gap-2 flex">
                <p className="w-[30%]">Phòng:</p>
                <p className="w-[70%]">
                  {item.info.phong}, {item.info.so_tiet} tiết
                </p>
              </div>
              <div className="gap-2 flex">
                <p className="w-[30%]">Môn:</p>
                <p className="w-[70%]">{item.info.ten_mon_hoc}</p>
              </div>
              <div className="gap-2 flex">
                <p className="w-[30%]">Trạng thái:</p>
                <p className="w-[70%] font-semibold">{item.info.trang_thai}</p>
              </div>
              {/* <div dangerouslySetInnerHTML={{ __html: item.info }} /> */}
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-2">
                <Button
                  color={`${item.di_muon_color.split("-")[2]}`}
                  className="w-fit"
                  onClick={() => {
                    Swal.fire({
                      title:
                        "Thầy/Cô có chắc chắn muốn đánh dấu Muộn/Không Muộn cho lịch học?",
                      icon: "warning",
                      confirmButtonColor: "#006FEE",
                      showConfirmButton: true,
                      showCancelButton: true,
                      confirmButtonText: "Xác nhận",
                      cancelButtonText: "Huỷ",
                      showLoaderOnConfirm: true,
                      allowOutsideClick: () => !Swal.isLoading(),
                      preConfirm: async () =>
                        await diMuonMutation.mutateAsync({
                          id: item.id,
                          date: date.toString().split("-").reverse().join("/"),
                        }),
                    });
                  }}
                >
                  {item.di_muon_alias}
                </Button>
                <Button
                  color={`${item.ve_som_color.split("-")[2]}`}
                  className="w-fit"
                  onClick={() => {
                    Swal.fire({
                      title:
                        "Thầy/Cô có chắc chắn muốn đánh dấu Về Sớm/Không Về Sớm cho lịch học?",
                      icon: "warning",
                      confirmButtonColor: "#006FEE",
                      showConfirmButton: true,
                      showCancelButton: true,
                      confirmButtonText: "Xác nhận",
                      cancelButtonText: "Huỷ",
                      showLoaderOnConfirm: true,
                      allowOutsideClick: () => !Swal.isLoading(),
                      preConfirm: async () =>
                        await veSomMutation.mutateAsync({
                          id: item.id,
                          date: date.toString().split("-").reverse().join("/"),
                        }),
                    });
                  }}
                >
                  {item.ve_som_alias}
                </Button>
                <Button
                  color={`${item.bo_tiet_color.split("-")[2]}`}
                  className="w-fit"
                  onClick={() => {
                    Swal.fire({
                      title:
                        "Thầy/Cô có chắc chắn muốn đánh dấu Bỏ Tiết/Không Bỏ Tiết cho lịch học?",
                      icon: "warning",
                      confirmButtonColor: "#006FEE",
                      showConfirmButton: true,
                      showCancelButton: true,
                      confirmButtonText: "Xác nhận",
                      cancelButtonText: "Huỷ",
                      showLoaderOnConfirm: true,
                      allowOutsideClick: () => !Swal.isLoading(),
                      preConfirm: async () =>
                        await boTietMutation.mutateAsync({
                          id: item.id,
                          date: date.toString().split("-").reverse().join("/"),
                        }),
                    });
                  }}
                >
                  {item.bo_tiet_alias}
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <Textarea
                isDisabled={!isEdit}
                value={note1}
                onValueChange={setNote1}
                variant="flat"
                minRows={5}
                maxRows={5}
                placeholder="Nhập ghi chú của thanh tra!"
                // classNames={{ inputWrapper: "border border-black" }}
              />
            </TableCell>
            <TableCell>
              <Textarea
                value={data.note2}
                isDisabled
                variant="flat"
                minRows={5}
                maxRows={5}
                placeholder="Ghi chú của giảng viên!"
                // classNames={{ inputWrapper: "border border-black" }}
              />
            </TableCell>
            <TableCell>
              <Textarea
                isDisabled={!isEdit}
                value={note3}
                onValueChange={setNote3}
                variant="flat"
                minRows={5}
                maxRows={5}
                placeholder="Kết luận!"
                // classNames={{ inputWrapper: "border border-black" }}
              />
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-2">
                {isEdit && (
                  <div className="flex gap-2">
                    <Tooltip content="Cập nhật" color="success" closeDelay={0}>
                      <Save className="cursor-pointer" />
                    </Tooltip>
                    <Tooltip
                      content="Huỷ chỉnh sửa"
                      color="danger"
                      closeDelay={0}
                    >
                      <CircleX
                        className="cursor-pointer"
                        onClick={() => setIsEdit(false)}
                      />
                    </Tooltip>
                  </div>
                )}

                <div className="flex gap-2">
                  {isEdit ? (
                    <></>
                  ) : (
                    item.can_thanh_tra_edit && (
                      <Tooltip content="Sửa" color="success" closeDelay={0}>
                        <Settings
                          className="cursor-pointer"
                          onClick={() => setIsEdit(true)}
                        />
                      </Tooltip>
                    )
                  )}
                  {item.can_report && (
                    <Tooltip content="Báo cáo" color="danger" closeDelay={0}>
                      <MessageCircleWarning
                        className="cursor-pointer"
                        onClick={() => {
                          Swal.fire({
                            title:
                              "Thầy/Cô có chắc chắn muốn báo cáo cho lịch học?",
                            icon: "warning",
                            confirmButtonColor: "#006FEE",
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Xác nhận",
                            cancelButtonText: "Huỷ",
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !Swal.isLoading(),
                            preConfirm: async () =>
                              await reportMutation.mutateAsync({
                                id: item.id,
                                date: date
                                  .toString()
                                  .split("-")
                                  .reverse()
                                  .join("/"),
                              }),
                          });
                        }}
                      />
                    </Tooltip>
                  )}
                  {item.can_unreport && (
                    <Tooltip
                      content="Huỷ báo cáo"
                      color="danger"
                      closeDelay={0}
                    >
                      <Undo2
                        className="cursor-pointer"
                        //   onClick={() => setIsEdit(true)}
                      />
                    </Tooltip>
                  )}
                  {item.can_remove && (
                    <Tooltip content="Huỷ " color="warning" closeDelay={0}>
                      <CircleX
                        className="cursor-pointer"
                        //   onClick={() => setIsEdit(true)}
                      />
                    </Tooltip>
                  )}
                  {item.can_restore && (
                    <Tooltip content="Phục hồi" color="warning" closeDelay={0}>
                      <ArchiveRestore
                        className="cursor-pointer"
                        //   onClick={() => setIsEdit(true)}
                      />
                    </Tooltip>
                  )}
                  {item.can_confirm && (
                    <Tooltip content="Xác nhận" color="primary" closeDelay={0}>
                      <CircleCheckBig
                        className="cursor-pointer"
                        //   onClick={() => setIsEdit(true)}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
              {/* {isEdit ? (
                <div className="flex gap-2">
                  <Tooltip content="Cập nhật" color="success" closeDelay={0}>
                    <Save className="cursor-pointer" />
                  </Tooltip>
                  <Tooltip content="Huỷ" color="danger" closeDelay={0}>
                    <CircleX
                      className="cursor-pointer"
                      onClick={() => setIsEdit(false)}
                    />
                  </Tooltip>
                </div>
              ) : (
                <Tooltip content="Sửa" color="success" closeDelay={0}>
                  <Settings
                    className="cursor-pointer"
                    onClick={() => setIsEdit(true)}
                  />
                </Tooltip>
              )} */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Content = () => {
  const [date, setDate] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["thanh_tra_lich_trinh", date],
    queryFn: () =>
      getLichTrinhGiangDay({
        date: date?.toString().split("-").reverse().join("/"),
      }),
    enabled: !!date,
  });

  //   console.log(fetchStatus);

  return (
    <div className="flex flex-col gap-4">
      <DatePicker
        label="Thời gian"
        className="max-w-xs"
        variant="bordered"
        showMonthAndYearPickers
        value={date}
        onChange={setDate}
        // popoverProps={{ triggerScaleOnOpen: true }}
        classNames={{ calendar: "w-fit", calendarContent: "w-fit" }}
      />
      <TableContent data={data} isLoading={isLoading} date={date} />
    </div>
  );
};

export default Content;
