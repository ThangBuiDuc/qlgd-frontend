"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { getDanhSachGiangVien, getLopMonHoc } from "@/ultis/daotao";
import Loading from "@/app/_hardComponents/loading";
const LopMonHoc = () => {
  const searchParams = useSearchParams();
  const { getToken } = useAuth();
  const { data: giang_viens, gvIsLoading } = useQuery({
    queryKey: [
      "giang_viens",
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getDanhSachGiangVien({
        hocky: searchParams.get("hocky"),
        namhoc: searchParams.get("namhoc"),
      }),
  });

  const { data: lop_mon_hocs, isLoading: lopIsLoading } = useQuery({
    queryKey: [
      "danh_sach_lop",
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getLopMonHoc({
        hocky: searchParams.get("hocky"),
        namhoc: searchParams.get("namhoc"),
      }),
  });

  if (gvIsLoading || lopIsLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h6>Thêm môn học</h6>
        <Table
          isStriped
          aria-label="Them mon hoc"
          classNames={{
            th: ["!bg-[#006FEE]", "text-white"],
            //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>Mã môn học</TableColumn>
            <TableColumn>Tên môn học</TableColumn>
            <TableColumn>Thao tác</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2">
        <h6>Tạo lớp</h6>
        <Table
          isStriped
          aria-label="Tao lop"
          classNames={{
            th: ["!bg-[#006FEE]", "text-white"],
            //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>Mã môn học</TableColumn>
            <TableColumn>Tên môn học</TableColumn>
            <TableColumn>Thao tác</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LopMonHoc;
