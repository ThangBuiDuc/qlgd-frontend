"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { CircleCheckBig } from "lucide-react";

const DiemDanh = ({ data }) => {
  console.log(data);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <p>Thông tin điểm danh:</p>
        <Table
          aria-label="Thong tin buoi hoc"
          classNames={{
            th: ["!bg-green-200", "text-black"],
            tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>STT</TableColumn>
            <TableColumn>Sinh viên</TableColumn>
            <TableColumn>Tình hình đi học</TableColumn>
            <TableColumn>Vắng</TableColumn>
            <TableColumn>Số tiết vắng</TableColumn>
            <TableColumn>Phép</TableColumn>
            <TableColumn>Bắt buộc tham dự</TableColumn>
            <TableColumn>Ghi chú</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
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

export default DiemDanh;
