"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const GiangVien = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <h5>Thông tin giảng viên</h5>
      <Table
        aria-label="Thong tin giang vien"
        classNames={{
          th: ["!bg-[#006FEE]", "text-white"],
          // //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>Họ và tên</TableColumn>
          <TableColumn>Mã giảng viên</TableColumn>
          <TableColumn>Tên khoa</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{data.hovaten}</TableCell>
            <TableCell>{data.code}</TableCell>
            <TableCell>{data.ten_khoa}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default GiangVien;
