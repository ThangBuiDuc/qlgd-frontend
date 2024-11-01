"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
// import moment from "moment";
import Link from "next/link";
// import { useMemo, useState } from "react";
import moment from "moment";
import { useMemo, useState } from "react";
// import { useAsyncList } from "@react-stately/data";
// import { Spinner } from "@nextui-org/spinner";
import { Progress } from "react-sweet-progress";

const Student = ({ lop }) => {
  const header = [
    { key: "stt", label: "STT" },
    { key: "ho_ten", label: "Họ và tên" },
    { key: "code", label: "Mã sinh viên" },
    { key: "ma_lop_hanh_chinh", label: "Lớp hành chính" },
    { key: "tinhhinh", label: "Tình hình đi học" },
    { key: "tong_tiet_vang", label: "Tổng tiết vắng" },
    {
      key: "chuyen_can",
      label: `${lop.tinh_hinh_hoc_tap.headers[0].group_name} (${lop.tinh_hinh_hoc_tap.headers[0].weight}%)`,
    },
    {
      key: "thuc_hanh",
      label: `${lop.tinh_hinh_hoc_tap.headers[1].group_name} (${lop.tinh_hinh_hoc_tap.headers[1].weight}%)`,
    },
    {
      key: "trung_binh",
      label: `${lop.tinh_hinh_hoc_tap.headers[2].group_name} (${lop.tinh_hinh_hoc_tap.headers[2].weight}%)`,
    },
    {
      key: "qua_trinh",
      label: "Điểm quá trình",
    },
  ];
  const [sortDescriptor, setSortDescriptor] = useState(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const pages = Math.ceil(lop.tinh_hinh_hoc_tap.body.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return lop.tinh_hinh_hoc_tap.body
      .map((item, index) => ({ ...item, stt: index + 1, ho_ten: item.hovaten }))
      .slice(start, end);
  }, [page, lop.tinh_hinh_hoc_tap.body]);

  const sortedItems = useMemo(() => {
    return sortDescriptor === null
      ? items
      : [...items].sort((a, b) => {
          if (
            ["chuyen_can", "thuc_hanh", "trung_binh"].some(
              (item) => item === sortDescriptor.column
            )
          ) {
          } else {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
          }
        });
  }, [sortDescriptor, items]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h5>Thông tin lớp học</h5>
        <Table
          aria-label="Thong tin lop hoc"
          classNames={{
            th: ["!bg-green-200", "text-black"],
            // tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>Mã lớp</TableColumn>
            <TableColumn>Môn</TableColumn>
            <TableColumn>Giảng viên</TableColumn>
            <TableColumn>Tổng số tiết</TableColumn>
            <TableColumn>Khối lượng dự kiến</TableColumn>
            <TableColumn>Khối lượng thực hiện</TableColumn>
            <TableColumn>ngôn ngữ</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{lop.lop_hoc.ma_lop}</TableCell>
              <TableCell>{lop.lop_hoc.ten_mon_hoc}</TableCell>
              <TableCell>{lop.lop_hoc.giang_vien}</TableCell>
              <TableCell>{lop.lop_hoc.tong_so_tiet}</TableCell>
              <TableCell>{lop.lop_hoc.khoi_luong_du_kien}</TableCell>
              <TableCell>{lop.lop_hoc.khoi_luong_thuc_hien}</TableCell>
              <TableCell>{lop.lop_hoc.ngon_ngu}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2">
        <h5>Tình hình học tập</h5>
        <Table
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          aria-label="Tinh hinh hoc tap"
          classNames={{
            th: ["!bg-green-200", "text-black"],
            tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            {header.map((item) => (
              <TableColumn key={item.key} allowsSorting>
                {item.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {sortedItems.map((item) => (
              <TableRow key={item.enrollment_group_id}>
                <TableCell>{item.stt}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.ho_ten}
                </TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.ma_lop_hanh_chinh}</TableCell>
                <TableCell>
                  <Progress
                    percent={item.tinhhinh}
                    symbolClassName={"progresspercent"}
                    status={"success"}
                    theme={{
                      success: {
                        symbol: "",
                        trailColor: "#5cb85c",
                        color: "#d9534f",
                      },
                    }}
                  />
                </TableCell>
                <TableCell>{item.tong_tiet_vang}</TableCell>
                {/* <TableCell>{item.ma_lop_hanh_chinh}</TableCell> */}
                {item.group_submissions.map((item) => (
                  <TableCell key={item.assignment_group_id}>
                    {item.grade == 0 ? "" : item.grade}
                  </TableCell>
                ))}
                <TableCell>
                  {item.diem_qua_trinh == 0 ? "" : item.diem_qua_trinh}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Student;
