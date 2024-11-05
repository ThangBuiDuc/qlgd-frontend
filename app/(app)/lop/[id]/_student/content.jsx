"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
// import { Pagination } from "@nextui-org/pagination";
// import moment from "moment";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import moment from "moment";
// import { useMemo, useState } from "react";
// import { useAsyncList } from "@react-stately/data";
// import { Spinner } from "@nextui-org/spinner";
// import { Progress } from "react-sweet-progress";
import TinhHinh from "./tinhHinh";
import BuoiHoc from "./buoiHoc";

const Student = ({ lop }) => {
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
            <TableColumn>Giảng viên</TableColumn>
            <TableColumn>Tổng số tiết</TableColumn>
            <TableColumn>Khối lượng dự kiến</TableColumn>
            <TableColumn>Khối lượng thực hiện</TableColumn>
            <TableColumn>ngôn ngữ</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{lop.lop_hoc.ma_lop}</TableCell>
              <TableCell>{lop.lop_hoc.ten_mon_hoc}</TableCell>
              <TableCell>{lop.lop_hoc.giang_vien}</TableCell>
              <TableCell>{lop.lop_hoc.tong_so_tiet}</TableCell>
              <TableCell>{lop.lop_hoc.khoi_luong_du_kien}</TableCell>
              <TableCell>{lop.lop_hoc.khoi_luong_thuc_hien}</TableCell>
              <TableCell>{lop.lop_hoc.ngon_ngu}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <TinhHinh tinh_hinh_hoc_tap={lop.tinh_hinh_hoc_tap} />
      <BuoiHoc cac_buoi_hoc={lop.cac_buoi_hoc} />
    </div>
  );
};

export default Student;
