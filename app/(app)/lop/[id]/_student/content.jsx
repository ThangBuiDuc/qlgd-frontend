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
// import moment from "moment";
import Link from "next/link";
// import { useMemo, useState } from "react";
import { Line } from "rc-progress";
import moment from "moment";
import { useMemo, useState } from "react";
// import { useAsyncList } from "@react-stately/data";
// import { Spinner } from "@nextui-org/spinner";

const header = [
  { key: "stt", label: "STT" },
  { key: "ho_ten", label: "Họ và tên" },
  { key: "ma_sinh_vien", label: "Mã sinh viên" },
  { key: "lop_hanh_chinh", label: "Lớp hành chính" },
  { key: "tinh_hinh_di_hoc", label: "Tình hình đi học" },
  { key: "tong_tiet_vang", label: "Tổng tiết vắng" },
];

const Student = ({ lop }) => {
  console.log(lop);
  const [sortDescriptor, setSortDescriptor] = useState(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const pages = Math.ceil(lop.tinh_hinh_hoc_tap.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return lop.tinh_hinh_hoc_tap.slice(start, end);
  }, [page, lop.tinh_hinh_hoc_tap]);

  const sortedItems = useMemo(() => {
    return sortDescriptor === null
      ? items
      : [...items].sort((a, b) => {
          const first = a[sortDescriptor.column];
          const second = b[sortDescriptor.column];
          const cmp =
            column === "thoi_gian"
              ? moment(moment(first)).diff(moment(second))
              : first < second
              ? -1
              : first > second
              ? 1
              : 0;

          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
  }, [sortDescriptor, items]);

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
      <div className="flex flex-col gap-2">
        <h5>Tình hình học tập</h5>
        <Table
          aria-label="Tinh hinh hoc tap"
          classNames={{
            th: ["!bg-green-200", "text-black"],
            tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>{/* {header.map} */}</TableHeader>
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
    </div>
  );
};

export default Student;
