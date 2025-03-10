"use client";
import Loading from "@/app/_hardComponents/loading";
import {
  getLichTrinhLop,
  huyHoanHanhLichDay,
  phucHoiLichDay,
  xoaLichDay,
} from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
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
import Link from "next/link";
import { Chip } from "@nextui-org/chip";

import Row from "./row";
import RowNghiDay from "./rowNghiDay";
import RowBoSung from "./rowBoSung";
import Swal from "sweetalert2";

const RenderCell = ({ data, params }) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const uncompleteMutation = useMutation({
    mutationFn: async (data) =>
      huyHoanHanhLichDay(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        params.id,
        { id: data.id, lop_id: params.id }
      ),
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["lich_bo_sung", params.id]);
      queryClient.setQueryData(["lich_trinh_lop", params.id], data);
      Swal.fire({
        title: "Huỷ hoàn thành lịch dạy thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Huỷ hoàn thành lịch dạy không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (data) =>
      xoaLichDay(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id,
        { id: data.id, lop_id: params.id }
      ),
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["lich_bo_sung", params.id]);
      queryClient.setQueryData(["lich_trinh_lop", params.id], data);
      Swal.fire({
        title: "Xoá lịch dạy thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Xoá lịch dạy không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async (data) =>
      phucHoiLichDay(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id,
        { id: data.id, lop_id: params.id }
      ),
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["lich_bo_sung", params.id]);
      queryClient.setQueryData(["lich_trinh_lop", params.id], data);
      Swal.fire({
        title: "Phục hồi lịch dạy thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Phục hồi lịch dạy không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  if (data.alias_state === "Bổ sung")
    return (
      <RowBoSung
        data={data}
        params={params}
        uncompleteMutation={uncompleteMutation}
        removeMutation={removeMutation}
        restoreMutation={restoreMutation}
      />
    );

  if (data.alias_state === "Nghỉ dạy")
    return (
      <RowNghiDay
        data={data}
        params={params}
        removeMutation={removeMutation}
        restoreMutation={restoreMutation}
      />
    );

  return (
    <Row
      data={data}
      params={params}
      uncompleteMutation={uncompleteMutation}
      removeMutation={removeMutation}
      restoreMutation={restoreMutation}
    />
  );
};

const TKB = ({ params }) => {
  const { getToken } = useAuth();
  // const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["lich_trinh_lop", params.id],
    queryFn: async () =>
      getLichTrinhLop(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id
      ),
  });

  if (isLoading) return <Loading />;

  // console.log(data);

  return (
    <Table
      isStriped
      aria-label="Danh sach lich trinh lop"
      classNames={{
        th: ["!bg-[#006FEE]", "text-white"],
        // //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
      }}
    >
      <TableHeader>
        <TableColumn>Tuần</TableColumn>
        <TableColumn>Thời gian</TableColumn>
        <TableColumn>Tiết bắt đầu</TableColumn>
        <TableColumn>Phòng</TableColumn>
        <TableColumn>Số tiết</TableColumn>
        <TableColumn>Loại</TableColumn>
        <TableColumn>Giờ học</TableColumn>
        <TableColumn>Trạng thái</TableColumn>
        <TableColumn>Lý do nghỉ dạy</TableColumn>
        <TableColumn>Thao tác</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.tuan}</TableCell>
            <TableCell>
              <Link href={`/lich/${item.id}`}>{item.thoi_gian}</Link>
            </TableCell>
            <TableCell>{item.tiet_bat_dau}</TableCell>
            <TableCell>{item.phong}</TableCell>
            <TableCell>{item.so_tiet}</TableCell>
            <TableCell>{item.type_status}</TableCell>
            <TableCell>{item.alias_state}</TableCell>
            <TableCell>
              <Chip color={`${item.color_status.split(" ")[1].split("-")[1]}`}>
                {item.alias_status}
              </Chip>
            </TableCell>
            <TableCell>{item.note}</TableCell>
            <TableCell>
              <RenderCell data={item} params={params} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TKB;
