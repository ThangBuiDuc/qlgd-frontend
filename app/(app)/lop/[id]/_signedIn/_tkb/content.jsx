"use client";
import Loading from "@/app/_hardComponents/loading";
import { getLichTrinhLop } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
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

const RenderCell = ({ data, params }) => {
  if (data.alias_state === "Bổ sung")
    return <RowBoSung data={data} params={params} />;

  if (data.alias_state === "Nghỉ dạy")
    return <RowNghiDay data={data} params={params} />;

  return <Row data={data} params={params} />;
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
      aria-label="Danh sach lich trinh lop"
      isStriped
      classNames={{
        th: ["!bg-green-200", "text-black"],
        // tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
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
