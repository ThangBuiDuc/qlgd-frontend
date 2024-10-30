"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import moment from "moment";
import Link from "next/link";
import { useMemo, useState } from "react";

const Student = ({ calendar }) => {
  // console.log(calendar);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h5>Thông tin lớp học</h5>
        <Table
          aria-label="Thong tin lop hoc"
          classNames={{
            th: ["!bg-green-200", "text-black"],
            // tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>Mã lớp</TableColumn>
            <TableColumn>Môn</TableColumn>
            <TableColumn>Tổng số tiết</TableColumn>
            <TableColumn>Khối lượng dự kiến</TableColumn>
            <TableColumn>Khối lượng thực hiện</TableColumn>
            <TableColumn>ngôn ngữ</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link
                  href={"#"}
                  className="hover:underline text-[#0083C2] cursor-pointer"
                >
                  {calendar.lop_mon_hoc.ma_lop}
                </Link>
              </TableCell>
              <TableCell>{calendar.lop_mon_hoc.ten_mon_hoc}</TableCell>
              <TableCell>{calendar.lop_mon_hoc.tong_so_tiet}</TableCell>
              <TableCell>{calendar.lop_mon_hoc.khoi_luong_du_kien}</TableCell>
              <TableCell>{calendar.lop_mon_hoc.khoi_luong_thuc_hien}</TableCell>
              <TableCell>{calendar.lop_mon_hoc.ngon_ngu}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Student;
