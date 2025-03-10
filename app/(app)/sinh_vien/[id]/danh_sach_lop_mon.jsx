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

const DanhSachLopMon = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <h5>Danh sách lớp môn</h5>
      <Table
        isStriped
        aria-label="Danh sach lop mon"
        classNames={{
          th: ["!bg-[#006FEE]", "text-white"],
          //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>STT</TableColumn>
          <TableColumn>Mã lớp</TableColumn>
          <TableColumn>Môn</TableColumn>
          <TableColumn>Giảng viên</TableColumn>
          <TableColumn>Sĩ số</TableColumn>
          <TableColumn>Số tiết vắng</TableColumn>
          <TableColumn>Điểm quá trình</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{++index}</TableCell>
              <TableCell>
                <Link href={`/lop/${item.id}`}>{item.ma_lop}</Link>
              </TableCell>
              <TableCell>{item.ten_mon_hoc}</TableCell>
              <TableCell>{item.giang_vien}</TableCell>
              <TableCell>{item.si_so}</TableCell>
              <TableCell>{item.tong_vang}</TableCell>
              <TableCell>{item.diemqt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DanhSachLopMon;
