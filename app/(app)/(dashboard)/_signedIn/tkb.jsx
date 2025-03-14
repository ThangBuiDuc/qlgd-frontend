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
import { useSearchParams } from "next/navigation";
// import moment from "moment";

// function isDateInRange(dateStr, startStr, endStr) {
//   // Parse the dates in DD-MM-yyyy format
//   const parseDate = (str) => {
//     const [day, month, year] = str.split("/").map(Number);
//     return new Date(year, month - 1, day); // Month is zero-based
//   };

//   const date = parseDate(dateStr);
//   const startDate = parseDate(startStr);
//   const endDate = parseDate(endStr);

//   // Check if the date is within the range (inclusive)
//   return date >= startDate && date <= endDate;
// }

const TKB = () => {
  const searchParams = useSearchParams();
  const { userId, getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: [
      `lich_trinh_${userId}`,
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getLichTrinhGiangVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        { hocky: searchParams.get("hocky"), namhoc: searchParams.get("namhoc") }
      ),
  });

  if (isLoading) {
    return <Spinner size="md" color="primary" />;
  }

  return (
    <Accordion
      variant="bordered"
      defaultExpandedKeys={[`${data.find((item) => item.active)?.tuan.id}`]}
    >
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
                isStriped
                aria-label="Lich day trong tuan"
                classNames={{
                  th: ["!bg-[#006FEE]", "text-white"],
                  //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
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
                        <Link
                          href={`/lich/${el.id}${
                            searchParams.get("hocky") &&
                            searchParams.get("namhoc")
                              ? `?hocky=${searchParams.get(
                                  "hocky"
                                )}&namhoc=${searchParams.get("namhoc")}`
                              : ""
                          }`}
                        >
                          {el.thoi_gian}
                        </Link>
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
