"use client";
import { getDanhSachLopGiangVien } from "@/ultis/giang_vien";
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
import { useSearchParams } from "next/navigation";

const TKB = () => {
  const searchParams = useSearchParams();
  const { userId, getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: [
      `lop_${userId}`,
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getDanhSachLopGiangVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        { hocky: searchParams.get("hocky"), namhoc: searchParams.get("namhoc") }
      ),
  });

  // console.log(data);

  if (isLoading) {
    return <Spinner size="md" color="primary" />;
  }

  return (
    <Table
      isStriped
      aria-label="Danh sach lop"
      classNames={{
        th: ["!bg-[#006FEE]", "text-white"],
        //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
      }}
    >
      <TableHeader>
        <TableColumn>Lớp</TableColumn>
        <TableColumn>Môn</TableColumn>
        <TableColumn>Khối lượng dự kiến</TableColumn>
        <TableColumn>Khối lượng thực hiện</TableColumn>
        <TableColumn>Sĩ số</TableColumn>
        <TableColumn>Đã cấu hình</TableColumn>
      </TableHeader>
      <TableBody>
        {data?.map((el) => (
          <TableRow key={el.id}>
            <TableCell>
              <Link
                href={`/lop/${el.id}${
                  searchParams.get("hocky") && searchParams.get("namhoc")
                    ? `?hocky=${searchParams.get(
                        "hocky"
                      )}&namhoc=${searchParams.get("namhoc")}`
                    : ""
                }`}
              >
                {el.ma_lop}
              </Link>
            </TableCell>
            <TableCell>{el.ten_mon_hoc}</TableCell>
            <TableCell>{el.khoi_luong_du_kien}</TableCell>
            <TableCell>{el.khoi_luong_thuc_hien}</TableCell>
            <TableCell>{el.si_so}</TableCell>
            <TableCell>
              {el.updated === false ? "Chưa cấu hình" : "Đã cấu hình"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TKB;
