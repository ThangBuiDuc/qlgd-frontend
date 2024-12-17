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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { chapNhanLichDangKy, khongChapNhanLichDangKy } from "@/ultis/daotao";
import { useAuth } from "@clerk/nextjs";

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
        aria-label="Thoi khoa bieu"
        classNames={{
          th: ["!bg-green-200", "text-black"],
          tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>Tuần</TableColumn>
          <TableColumn>Thời gian</TableColumn>
          <TableColumn>Thông tin</TableColumn>
          <TableColumn>Tiết bắt đầu</TableColumn>
          <TableColumn>Phòng</TableColumn>
          <TableColumn>Số tiết</TableColumn>
          <TableColumn>Loại</TableColumn>
          <TableColumn>Giờ học</TableColumn>
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
                <div className="flex gap-2">
                  {item.alias_state === "Bổ sung" && (
                    <Tooltip content="Kiểm tra" color="warning" closeDelay={0}>
                      <FileSearch2
                        className="cursor-pointer"
                        //   onClick={() => {
                        //     Swal.fire({
                        //       title:
                        //         "Thầy/Cô có chắc chắn muốn chấp nhận lịch đăng ký?",
                        //       icon: "warning",
                        //       confirmButtonColor: "#006FEE",
                        //       showConfirmButton: true,
                        //       showCancelButton: true,
                        //       confirmButtonText: "Xác nhận",
                        //       cancelButtonText: "Huỷ",
                        //       showLoaderOnConfirm: true,
                        //       allowOutsideClick: () => !Swal.isLoading(),
                        //       preConfirm: async () =>
                        //         await generateMutation.mutateAsync(item),
                        //     });
                        //   }}
                      />
                    </Tooltip>
                  )}
                  <Tooltip content="Chấp nhận" color="primary" closeDelay={0}>
                    <CircleCheckBig
                      className="cursor-pointer"
                      onClick={() => {
                        Swal.fire({
                          title:
                            "Thầy/Cô có chắc chắn muốn chấp nhận lịch đăng ký?",
                          icon: "warning",
                          confirmButtonColor: "#006FEE",
                          showConfirmButton: true,
                          showCancelButton: true,
                          confirmButtonText: "Xác nhận",
                          cancelButtonText: "Huỷ",
                          showLoaderOnConfirm: true,
                          allowOutsideClick: () => !Swal.isLoading(),
                          preConfirm: async () =>
                            await acceptMutation.mutateAsync(item),
                        });
                      }}
                    />
                  </Tooltip>
                  <Tooltip
                    content="Không chấp nhận"
                    color="warning"
                    closeDelay={0}
                  >
                    <CircleX
                      className="cursor-pointer"
                      onClick={() => {
                        Swal.fire({
                          title:
                            "Thầy/Cô có chắc chắn muốn không chấp nhận lịch đăng ký?",
                          icon: "warning",
                          confirmButtonColor: "#006FEE",
                          showConfirmButton: true,
                          showCancelButton: true,
                          confirmButtonText: "Xác nhận",
                          cancelButtonText: "Huỷ",
                          showLoaderOnConfirm: true,
                          allowOutsideClick: () => !Swal.isLoading(),
                          preConfirm: async () =>
                            await denyMutation.mutateAsync(item),
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
  );
};

export default LichDangKy;
