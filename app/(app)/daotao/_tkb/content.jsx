"use client";
import Loading from "@/app/_hardComponents/loading";
import {
  duyetThucHien,
  getDaoTaoLichLopMonHoc,
  phucHoiThoiKhoaBieu,
  taoThoiKhoaBieu,
  xoaThoiKhoaBieu,
  xoaVinhVienThoiKhoaBieu,
} from "@/ultis/daotao";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { CircleCheckBig, CircleX, ArchiveRestore, Trash2 } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";

const thuOptions = [
  { value: "2", label: "Thứ hai" },
  { value: "3", label: "Thứ ba" },
  { value: "4", label: "Thứ tư" },
  { value: "5", label: "Thứ năm" },
  { value: "6", label: "Thứ sáu" },
  { value: "7", label: "Thứ bảy" },
  { value: "8", label: "Chủ nhật" },
];

const tietOptions = [
  { value: "1", label: "1 (7h00)" },
  { value: "2", label: "2 (7h55)" },
  { value: "3", label: "3 (8h55)" },
  { value: "4", label: "4 (9h50)" },
  { value: "5", label: "5 (10h45)" },
  { value: "6", label: "6 (13h00)" },
  { value: "7", label: "7 (13h55)" },
  { value: "8", label: "8 (14h50)" },
  { value: "9", label: "9 (15h45)" },
  { value: "10", label: "10 (16h50)" },
  { value: "11", label: "11 (17h55)" },
  { value: "12", label: "12 (18h45)" },
  { value: "13", label: "13 (19h00)" },
  { value: "14", label: "14 (20h50)" },
  { value: "15", label: "15 (19h40)" },
  { value: "16", label: "16 (20h30)" },
];

const Content = ({ value }) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["dao_tao_lop_mon_hoc", value.value],
    queryFn: async () => getDaoTaoLichLopMonHoc(value.value),
  });
  const [tuanBatDau, setTuanBatDau] = useState({ value: 1, label: 1 });
  const [soTuan, setSoTuan] = useState({ value: 1, label: 1 });
  const [thu, setThu] = useState({ value: 2, label: "Thứ 2" });
  const [tiet, setTiet] = useState({ value: "1", label: "1 (7h00)" });
  const [soTiet, setSoTiet] = useState({ value: 1, label: 1 });
  const [phong, setPhong] = useState({ value: "A101", label: "A101" });
  const [giangVien, setGiangVien] = useState({
    value: data?.giang_viens[0]?.id,
    label: data?.giang_viens[0]?.text,
  });

  useEffect(() => {
    setGiangVien({
      value: data?.giang_viens[0]?.id,
      label: data?.giang_viens[0]?.text,
    });
  }, [data]);

  const mutation = useMutation({
    mutationFn: async () =>
      taoThoiKhoaBieu(
        value.value,
        {
          tuan_hoc_bat_dau: tuanBatDau.value,
          so_tuan: soTuan.value,
          thu: thu.value,
          tiet_bat_dau: tiet.value,
          so_tiet: soTiet.value,
          phong: phong.value,
          giang_vien_id: giangVien.value,
        },
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["dao_tao_lop_mon_hoc", value.value], data);
      Swal.fire({
        title: "Tạo thời khoá biểu thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Tạo thời khoá biểu không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (data) =>
      duyetThucHien(
        value.value,
        data,
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["dao_tao_lop_mon_hoc", value.value], data);
      Swal.fire({
        title: "Duyệt thực hiện thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Duyệt thực hiện không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (data) =>
      xoaThoiKhoaBieu(
        value.value,
        data,
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["dao_tao_lop_mon_hoc", value.value], data);
      Swal.fire({
        title: "Xoá thời khoá biểu thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Xoá thời khoá biểu không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async (data) =>
      phucHoiThoiKhoaBieu(
        value.value,
        data,
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["dao_tao_lop_mon_hoc", value.value], data);
      Swal.fire({
        title: "Phục hồi thời khoá biểu thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Phục hồi thời khoá biểu không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const destroyMutation = useMutation({
    mutationFn: async (data) =>
      xoaVinhVienThoiKhoaBieu(
        value.value,
        data,
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        })
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["dao_tao_lop_mon_hoc", value.value], data);
      Swal.fire({
        title: "Xoá vĩnh viễn thời khoá biểu thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Xoá vĩnh viễn thời khoá biểu không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex flex-col gap-2">
        <h5>Tạo thời khoá biểu</h5>
        {/* <div className="flex gap-2 w-full"> */}
        <div className="grid grid-cols-8 auto-rows-auto gap-3">
          <p>Tuần học bắt đầu</p>
          <p>Số tuần</p>
          <p>Thứ</p>
          <p>Tiết bắt đầu</p>
          <p>Số tiết</p>
          <p>Phòng</p>
          <p>Giảng viên</p>
          <div className="flex row-span-2 justify-center items-end">
            <Button
              className="w-fit"
              color="success"
              onClick={() => {
                Swal.fire({
                  title: "Thầy/Cô có chắc chắn muốn tạo thời khoá biểu?",
                  icon: "warning",
                  confirmButtonColor: "#006FEE",
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Xác nhận",
                  cancelButtonText: "Huỷ",
                  showLoaderOnConfirm: true,
                  allowOutsideClick: () => !Swal.isLoading(),
                  preConfirm: async () => await mutation.mutateAsync(),
                });
              }}
            >
              Thêm
            </Button>
          </div>
          <Select
            value={tuanBatDau}
            onChange={setTuanBatDau}
            options={[...new Array(20).keys()].map((item) => ({
              value: item + 1,
              label: item + 1,
            }))}
            placeholder="Tuần học bắt đầu"
          />
          <Select
            value={soTuan}
            onChange={setSoTuan}
            options={[...new Array(20).keys()].map((item) => ({
              value: item + 1,
              label: item + 1,
            }))}
            placeholder="Số tuần"
          />
          <Select
            value={thu}
            onChange={setThu}
            options={thuOptions}
            placeholder="Thứ"
          />
          <Select
            value={tiet}
            onChange={setTiet}
            options={tietOptions}
            placeholder="Số tiết"
          />
          <Select
            value={soTiet}
            onChange={setSoTiet}
            options={[...new Array(5).keys()].map((item) => ({
              value: item + 1,
              label: item + 1,
            }))}
            placeholder="Số tiết"
          />
          <Select
            value={phong}
            onChange={setPhong}
            options={data?.phongs.map((item) => ({
              value: item.id,
              label: item.text,
            }))}
            placeholder="Phòng"
          />
          <Select
            value={giangVien}
            onChange={setGiangVien}
            options={data?.giang_viens.map((item) => ({
              value: item.id,
              label: item.text,
            }))}
            placeholder="Giảng viên"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h5>Thời khoá biểu</h5>
          <Table
            aria-label="Thoi khoa bieu"
            classNames={{
              th: ["!bg-green-200", "text-black"],
              // tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
            }}
          >
            <TableHeader>
              <TableColumn>Tuần học bắt đầu</TableColumn>
              <TableColumn>Số tuần</TableColumn>
              <TableColumn>Thứ</TableColumn>
              <TableColumn>Tiết bắt đầu</TableColumn>
              <TableColumn>Số tiết</TableColumn>
              <TableColumn>Phòng</TableColumn>
              <TableColumn>Giảng viên</TableColumn>
              <TableColumn>Trạng thái</TableColumn>
              <TableColumn>Thao tác</TableColumn>
            </TableHeader>
            <TableBody>
              {data?.calendars.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.tuan_hoc_bat_dau}</TableCell>
                  <TableCell>{item.so_tuan}</TableCell>
                  <TableCell>{item.thu}</TableCell>
                  <TableCell>{item.tiet_bat_dau}</TableCell>
                  <TableCell>{item.so_tiet}</TableCell>
                  <TableCell>{item.phong}</TableCell>
                  <TableCell>{item.giang_vien}</TableCell>
                  <TableCell>{item.state}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {item.can_generate && (
                        <Tooltip
                          content="Duyệt thực hiện"
                          color="primary"
                          closeDelay={0}
                        >
                          <CircleCheckBig
                            className="cursor-pointer"
                            onClick={() => {
                              Swal.fire({
                                title:
                                  "Thầy/Cô có chắc chắn muốn duyệt thực hiện?",
                                icon: "warning",
                                confirmButtonColor: "#006FEE",
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: "Xác nhận",
                                cancelButtonText: "Huỷ",
                                showLoaderOnConfirm: true,
                                allowOutsideClick: () => !Swal.isLoading(),
                                preConfirm: async () =>
                                  await generateMutation.mutateAsync(item),
                              });
                            }}
                          />
                        </Tooltip>
                      )}
                      {item.can_remove && (
                        <Tooltip content="Xoá" color="warning" closeDelay={0}>
                          <CircleX
                            className="cursor-pointer"
                            onClick={() => {
                              Swal.fire({
                                title:
                                  "Thầy/Cô có chắc chắn muốn xoá thời khoá biểu?",
                                icon: "warning",
                                confirmButtonColor: "#006FEE",
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: "Xác nhận",
                                cancelButtonText: "Huỷ",
                                showLoaderOnConfirm: true,
                                allowOutsideClick: () => !Swal.isLoading(),
                                preConfirm: async () =>
                                  await deleteMutation.mutateAsync(item),
                              });
                            }}
                          />
                        </Tooltip>
                      )}
                      {item.can_restore && (
                        <Tooltip
                          content="Phục hồi"
                          color="success"
                          closeDelay={0}
                        >
                          <ArchiveRestore
                            className="cursor-pointer"
                            onClick={() => {
                              Swal.fire({
                                title:
                                  "Thầy/Cô có chắc chắn muốn phục hồi thời khoá biểu?",
                                icon: "warning",
                                confirmButtonColor: "#006FEE",
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: "Xác nhận",
                                cancelButtonText: "Huỷ",
                                showLoaderOnConfirm: true,
                                allowOutsideClick: () => !Swal.isLoading(),
                                preConfirm: async () =>
                                  await restoreMutation.mutateAsync(item),
                              });
                            }}
                          />
                        </Tooltip>
                      )}
                      <Tooltip
                        content="Xoá vĩnh viễn"
                        color="danger"
                        closeDelay={0}
                      >
                        <Trash2
                          className="cursor-pointer"
                          onClick={() => {
                            Swal.fire({
                              title:
                                "Thầy/Cô có chắc chắn muốn xoá vĩnh viễn thời khoá biểu?",
                              icon: "warning",
                              confirmButtonColor: "#006FEE",
                              showConfirmButton: true,
                              showCancelButton: true,
                              confirmButtonText: "Xác nhận",
                              cancelButtonText: "Huỷ",
                              showLoaderOnConfirm: true,
                              allowOutsideClick: () => !Swal.isLoading(),
                              preConfirm: async () =>
                                await destroyMutation.mutateAsync(item),
                            });
                          }}
                        />
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* </div> */}
      </div>
    </>
  );
};

export default Content;
