"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const ThongTin = ({ lop }) => {
  // console.log(lop);
  return (
    <div className="flex flex-col gap-3">
      <Table
        isStriped
        aria-label="Thong tin lop truong khoa"
        classNames={{
          //   tr: ["!bg-green-200"],
          th: ["!bg-green-200"],
          // //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>Giảng viên</TableColumn>
          <TableColumn>Mã lớp</TableColumn>
          <TableColumn>Tên môn học</TableColumn>
          <TableColumn>Duyệt đề cương</TableColumn>
          <TableColumn>Duyệt lịch trình</TableColumn>
          <TableColumn>Duyệt tình hình</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{lop.giang_viens}</TableCell>
            <TableCell>{lop.ma_lop}</TableCell>
            <TableCell>{lop.ten_mon_hoc}</TableCell>
            <TableCell>{lop.duyet_thong_so_status}</TableCell>
            <TableCell>{lop.duyet_lich_trinh_status}</TableCell>
            <TableCell>{lop.duyet_tinh_hinh_status}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ThongTin;
