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
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <p>Thông tin lớp môn học:</p>
        <Table
          aria-label="Danh sach lop"
          classNames={{
            th: ["!bg-green-200", "text-black"],
            // tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>Mã Lớp</TableColumn>
            <TableColumn>Tên môn học</TableColumn>
            <TableColumn>Sĩ số</TableColumn>
            <TableColumn>Số tiết lý thuyết</TableColumn>
            <TableColumn>Số tiết thực hành</TableColumn>
            <TableColumn>Ngôn ngữ</TableColumn>
            <TableColumn>Trạng thái</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{lop.ma_lop}</TableCell>
              <TableCell>{lop.ten_mon_hoc}</TableCell>
              <TableCell>{lop.si_so}</TableCell>
              <TableCell>{lop.settings.so_tiet_ly_thuyet}</TableCell>
              <TableCell>{lop.settings.so_tiet_thuc_hanh}</TableCell>
              <TableCell>{lop.settings.language}</TableCell>
              <TableCell>
                {lop.updated === false ? "Chưa cấu hình" : "Đã cấu hình"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ThongTin;
