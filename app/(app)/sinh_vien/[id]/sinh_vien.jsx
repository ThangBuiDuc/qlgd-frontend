"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import moment from "moment";

const SinhVien = ({ data }) => {
  //   console.log(data);
  return (
    <div className="flex flex-col gap-2">
      <h5>Thông tin sinh viên</h5>
      <Table
        aria-label="Thong tin giang vien"
        classNames={{
          th: ["!bg-green-200", "text-black"],
          // tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>Họ và tên</TableColumn>
          <TableColumn>Mã sinh viên</TableColumn>
          <TableColumn>Lớp hành chính</TableColumn>
          <TableColumn>Ngày sinh</TableColumn>
          <TableColumn>Giới tính</TableColumn>
          <TableColumn>Tín chỉ?</TableColumn>
          <TableColumn>Khoá</TableColumn>
          <TableColumn>Hệ</TableColumn>
          <TableColumn>Ngành</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{data.hovaten}</TableCell>
            <TableCell>{data.code}</TableCell>
            <TableCell>{data.ma_lop_hanh_chinh}</TableCell>
            <TableCell>{moment(data.ngay_sinh).format("DD/MM/yyyy")}</TableCell>
            <TableCell>{data.gioi_tinh}</TableCell>
            <TableCell>{data.tin_chi}</TableCell>
            <TableCell>{data.khoa}</TableCell>
            <TableCell>{data.he}</TableCell>
            <TableCell>{data.nganh}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SinhVien;
