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
// import { Progress } from "react-sweet-progress";

const BuoiHoc = ({ cac_buoi_hoc }) => {
  const header = [
    { key: "stt", label: "STT" },
    { key: "thoi_gian", label: "Thời gian" },
    { key: "phong", label: "Phòng" },
    { key: "so_tiet", label: "Số tiết" },
    { key: "lop", label: "Thông tin lớp" },
    { key: "giang_vien", label: "Giảng viên" },
    {
      key: "noi_dung",
      label: "Nội dung",
    },
    {
      key: "vang",
      label: "Sinh viên vắng",
    },
  ];

  //   const [sortDescriptor, setSortDescriptor] = useState(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const pages = Math.ceil(cac_buoi_hoc.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return cac_buoi_hoc
      .map((item, index) => ({ ...item, stt: index + 1 }))
      .slice(start, end);
  }, [page, cac_buoi_hoc]);

  //   const sortedItems = useMemo(() => {
  //     // console.log(Number(sortDescriptor?.column));
  //     return sortDescriptor === null
  //       ? items
  //       : [...items].sort((a, b) => {
  //           //   if (Number(sortDescriptor?.column)) {
  //           //     const first = a.group_submissions.find(
  //           //       (item) =>
  //           //         item.assignment_group_id === Number(sortDescriptor?.column)
  //           //     ).grade;
  //           //     const second = b.group_submissions.find(
  //           //       (item) =>
  //           //         item.assignment_group_id === Number(sortDescriptor?.column)
  //           //     ).grade;
  //           //     const cmp = first < second ? -1 : first > second ? 1 : 0;

  //           //     return sortDescriptor.direction === "descending" ? -cmp : cmp;
  //           //   } else {
  //           const first = a[sortDescriptor.column];
  //           const second = b[sortDescriptor.column];
  //           const cmp = first < second ? -1 : first > second ? 1 : 0;

  //           return sortDescriptor.direction === "descending" ? -cmp : cmp;
  //           //   }
  //         });
  //   }, [sortDescriptor, items]);

  return (
    <div className="flex flex-col gap-2">
      <h5>Các buổi học đã hoàn thành</h5>
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
        // sortDescriptor={sortDescriptor}
        // onSortChange={setSortDescriptor}
        aria-label="Cac buoi hoc da hoan thanh"
        classNames={{
          th: ["!bg-green-200", "text-black"],
          tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          {header.map((item) => (
            <TableColumn key={item.key}>{item.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.stt}</TableCell>
              <TableCell>
                <Link href={`/lich/${item.id}`}>
                  {moment(item.thoi_gian).format("HH:mm DD/MM/yyyy")}
                </Link>
              </TableCell>
              <TableCell>{item.phong}</TableCell>
              <TableCell>{item.so_tiet}</TableCell>
              <TableCell>
                <Link href={`/lop/${item.lop.id}`}>{item.lop.ma_lop}</Link>
                <br />
                {item.lop.ten_mon_hoc}
              </TableCell>
              <TableCell>
                <Link href={`/giang_vien/${item.giang_vien.id}`}>
                  {item.giang_vien.hovaten}
                </Link>
              </TableCell>
              <TableCell>
                <div dangerouslySetInnerHTML={{ __html: item.noi_dung }} />
              </TableCell>
              <TableCell>
                {item.danh_sach_vang.map((el) => (
                  <div key={el.id}>
                    <Link href={`/sinh_vien/${el.id}`}>
                      {el.hovaten}{" "}
                      {`(${el.so_tiet_vang}t${el.phep ? ", phép" : ""})`}
                    </Link>
                    <br />
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuoiHoc;
