"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { CircleCheckBig } from "lucide-react";

const ThongTin = ({ data }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <p>Thông tin buổi học:</p>
        <Table
          aria-label="Thong tin buoi hoc"
          classNames={{
            th: ["!bg-green-200", "text-black"],
            // tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>Phòng</TableColumn>
            <TableColumn>Loại</TableColumn>
            <TableColumn>Số tiết</TableColumn>
            <TableColumn>Số sinh viên có mặt</TableColumn>
            <TableColumn>Số sinh viên vắng</TableColumn>
            <TableColumn>Giờ học</TableColumn>
            <TableColumn>Trạng thái</TableColumn>
            <TableColumn>Thao tác</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{data.phong}</TableCell>
              <TableCell>{data.type_status}</TableCell>
              <TableCell>{data.so_tiet}</TableCell>
              <TableCell>{data.sv_co_mat}</TableCell>
              <TableCell>{data.sv_vang_mat}</TableCell>
              <TableCell>{data.alias_state}</TableCell>
              <TableCell>{data.alias_status}</TableCell>
              <TableCell>
                {data.updated && (
                  <Tooltip
                    content="Hoàn thành buổi học"
                    color="primary"
                    closeDelay={0}
                  >
                    <CircleCheckBig
                      className="cursor-pointer"
                      //   onClick={() => setUpdateModal(true)}
                    />
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ThongTin;
