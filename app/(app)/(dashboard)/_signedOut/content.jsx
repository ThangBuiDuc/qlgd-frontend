"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import moment from "moment";
import Link from "next/link";

const header = [
  "Thời gian",
  "Số tiết",
  "Phòng",
  "Giảng viên",
  "Mã lớp",
  "Môn",
  "Sĩ số",
  "Nội dung",
];

const NotSignedIn = ({ calendar }) => {
  console.log(calendar);
  // const use
  return (
    <div className="flex flex-col gap-2">
      <h5>Lịch học trong ngày</h5>
      <Table
        aria-label="Lich hoc trong ngay"
        isHeaderSticky
        isStriped
        classNames={{ th: ["!bg-green-200", "text-black"] }}
      >
        <TableHeader>
          {header.map((item, index) => (
            <TableColumn key={index}>{item}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {calendar.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {`${moment(item.thoi_gian).format("HH:mm DD/MM/yyyy")} ${
                  item.state === "bosung" ? "BS" : ""
                }`}
              </TableCell>
              <TableCell>{item.so_tiet}</TableCell>
              <TableCell className="whitespace-nowrap">
                <Link href={"#"}>
                  {`${item.phong ? item.phong : ""}${
                    item.sumary.length ? "*" : ""
                  }`}
                </Link>
                <br />
                {item.type_status}
              </TableCell>
              <TableCell className="whitespace-nowrap">{`${item.giang_vien.ho} ${item.giang_vien.dem} ${item.giang_vien.ten}`}</TableCell>
              <TableCell>
                <Link href={"#"}>{item.lop_mon_hoc.ma_lop}</Link>
              </TableCell>
              <TableCell>
                <Link href={"#"}>{item.lop_mon_hoc.ten_mon_hoc}</Link>
              </TableCell>
              <TableCell>{`${item.comat}/${item.lop_mon_hoc.si_so}`}</TableCell>
              <TableCell>{item.sumary}</TableCell>
              {/* <TableCell>{item.lop_mon_hoc.ten_mon_hoc}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NotSignedIn;
