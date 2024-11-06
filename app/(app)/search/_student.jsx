"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import Link from "next/link";

const Student = ({ results }) => {
  // console.log(results);
  return (
    <Table
      aria-label="Tim kiem sinh vien"
      classNames={{
        emptyWrapper: ["!text-black"],
        th: ["!bg-green-200", "text-black"],
        tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
      }}
    >
      <TableHeader>
        <TableColumn>STT</TableColumn>
        <TableColumn>Họ và tên</TableColumn>
        <TableColumn>Mã sinh viên</TableColumn>
        <TableColumn>Lớp hành chính</TableColumn>
        <TableColumn>Số lớp môn</TableColumn>
        <TableColumn>Số tiết vắng</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"Không tìm thấy sinh viên!"}>
        {results.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{++index}</TableCell>
            <TableCell>{`${item.ho} ${item.dem} ${item.ten}`}</TableCell>
            <TableCell>
              <Link href={"#"}>{item.code}</Link>
            </TableCell>
            <TableCell>{item.ma_lop_hanh_chinh}</TableCell>
            <TableCell>{item.so_lop_mon}</TableCell>
            <TableCell>{item.so_tiet_vang}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Student;
