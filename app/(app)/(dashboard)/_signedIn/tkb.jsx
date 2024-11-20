"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { getLichTrinhGiangVien } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/spinner";
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

const TKB = () => {
  const { userId, getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: [`lich_trinh_${userId}`],
    queryFn: async () =>
      getLichTrinhGiangVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV })
      ),
  });

  // console.log(data);

  if (isLoading) {
    return <Spinner size="md" color="primary" />;
  }

  return (
    <Accordion variant="bordered">
      {data
        ?.sort((a, b) => a.tuan.stt - b.tuan.stt)
        .map((item) => {
          let tuan = item.tuan;
          return (
            <AccordionItem
              key={tuan.id}
              aria-label={item.colapse}
              title={`Tuần ${tuan.stt} (${tuan.tu_ngay2} - ${tuan.den_ngay2})`}
            >
              <Table
                aria-label="Lich day trong tuan"
                classNames={{
                  th: ["!bg-green-200", "text-black"],
                  tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
                }}
              >
                <TableHeader>
                  <TableColumn>Thứ</TableColumn>
                  <TableColumn>Thời gian</TableColumn>
                  <TableColumn>Tiết bắt đầu</TableColumn>
                  <TableColumn>Số tiết</TableColumn>
                  <TableColumn>Giờ học</TableColumn>
                  <TableColumn>Phòng</TableColumn>
                  <TableColumn>Mã lớp</TableColumn>
                  <TableColumn>Môn</TableColumn>
                  <TableColumn>Loại</TableColumn>
                  <TableColumn>Trạng thái</TableColumn>
                </TableHeader>
                <TableBody>
                  {item.data.map((el) => (
                    <TableRow key={el.id}>
                      <TableCell className="whitespace-nowrap ">
                        {el.thu}
                      </TableCell>
                      <TableCell>
                        <Link href={`/lich/${el.id}`}>{el.thoi_gian}</Link>
                      </TableCell>
                      <TableCell>{el.tiet_bat_dau}</TableCell>
                      <TableCell>{el.so_tiet}</TableCell>
                      <TableCell>{el.type_status}</TableCell>
                      <TableCell>{el.phong}</TableCell>
                      <TableCell>{el.ma_lop}</TableCell>
                      <TableCell>{el.ten_mon_hoc}</TableCell>
                      <TableCell>{el.alias_state}</TableCell>
                      <TableCell>
                        <Chip
                          radius="sm"
                          color={`${
                            el.color_status.split(" ")[1].split("-")[1]
                          }`}
                          classNames={{ content: "font-semibold" }}
                        >
                          {el.alias_status}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
};

export default TKB;
