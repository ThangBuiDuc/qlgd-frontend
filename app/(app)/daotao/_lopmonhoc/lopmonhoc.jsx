"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const LopMonHoc = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h6>Thêm môn học</h6>
        <Table
          isStriped
          aria-label="Them mon hoc"
          classNames={{
            th: ["!bg-[#006FEE]", "text-white"],
            //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>Mã môn học</TableColumn>
            <TableColumn>Tên môn học</TableColumn>
            <TableColumn>Thao tác</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2">
        <h6>Tạo lớp</h6>
        <Table
          isStriped
          aria-label="Tao lop"
          classNames={{
            th: ["!bg-[#006FEE]", "text-white"],
            //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>Mã môn học</TableColumn>
            <TableColumn>Tên môn học</TableColumn>
            <TableColumn>Thao tác</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
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

export default LopMonHoc;
