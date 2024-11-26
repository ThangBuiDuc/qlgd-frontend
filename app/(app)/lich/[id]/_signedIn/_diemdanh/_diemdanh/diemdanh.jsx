"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { X } from "lucide-react";

const DisableTable = ({ data }) => {
  // console.log(data);
  return (
    <Table
      aria-label="Thong tin buoi hoc"
      classNames={{
        th: ["!bg-green-200", "text-black"],
        tr: ["even:bg-[#f2dede]"],
      }}
    >
      <TableHeader>
        <TableColumn>STT</TableColumn>
        <TableColumn>Sinh viên</TableColumn>
        <TableColumn>Tình hình đi học</TableColumn>
        <TableColumn>Vắng</TableColumn>
        <TableColumn>Số tiết vắng</TableColumn>
        <TableColumn>Phép</TableColumn>
        <TableColumn>Bắt buộc tham dự</TableColumn>
        <TableColumn>Ghi chú</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {item.name}
              <br />
              {`(${item.code})`}
            </TableCell>
            <TableCell>
              <div className="h-[20px] flex">
                <div
                  className="bg-green-500  text-white text-center rounded-l-sm"
                  style={{ width: 100 - item.tinhhinh + "%" }}
                >
                  <span>{100 - item.tinhhinh + "%"}</span>
                </div>
                <div
                  className=" bg-red-500 overflow-hidden text-center text-white  rounded-r-sm"
                  style={{
                    width: item.tinhhinh ? item.tinhhinh + "%" : 0,
                  }}
                >
                  <span>{item.tinhhinh + "%"}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <X />
            </TableCell>
            <TableCell>
              <X />
            </TableCell>
            <TableCell>
              <X />
            </TableCell>
            <TableCell>
              <X />
            </TableCell>
            <TableCell>
              <X />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const DiemDanh = ({ data, state }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <p>Thông tin điểm danh:</p>
        {state ? <></> : <DisableTable data={data} />}
      </div>
    </div>
  );
};

export default DiemDanh;
