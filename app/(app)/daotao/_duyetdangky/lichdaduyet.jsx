"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const LichDaDuyet = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <h5>Danh sách lịch đã duyệt</h5>
      <Table
        aria-label="danh sach lich da duyet"
        className="max-h-[500px]"
        classNames={{
          th: ["!bg-green-200", "text-black"],
          tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn>Tuần</TableColumn>
          <TableColumn>Thời gian</TableColumn>
          <TableColumn>Giảng viên</TableColumn>
          <TableColumn>Phòng</TableColumn>
          <TableColumn>Số tiết</TableColumn>
          <TableColumn>Loại</TableColumn>
          <TableColumn>Giờ học</TableColumn>
          <TableColumn>Trạng thái</TableColumn>
          <TableColumn>Ngày duyệt</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.tuan}</TableCell>
              <TableCell>{item.thoi_gian}</TableCell>
              <TableCell>{item.giang_vien}</TableCell>
              <TableCell>{item.phong}</TableCell>
              <TableCell>{item.so_tiet}</TableCell>
              <TableCell>{item.alias_state}</TableCell>
              <TableCell>{item.type_status}</TableCell>
              <TableCell>{item.alias_status}</TableCell>
              <TableCell>{item.updated_alias}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LichDaDuyet;
