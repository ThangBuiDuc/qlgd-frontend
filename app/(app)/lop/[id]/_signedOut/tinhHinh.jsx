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
// import moment from "moment";
import { useMemo, useState } from "react";
// import { useAsyncList } from "@react-stately/data";
// import { Spinner } from "@nextui-org/spinner";
import { Progress } from "react-sweet-progress";

const TinhHinh = ({ tinh_hinh_hoc_tap }) => {
  const header = [
    { key: "stt", label: "STT" },
    { key: "ho_ten", label: "Họ và tên" },
    { key: "code", label: "Mã sinh viên" },
    { key: "ma_lop_hanh_chinh", label: "Lớp hành chính" },
    { key: "tinhhinh", label: "Tình hình đi học" },
    { key: "tong_tiet_vang", label: "Tổng tiết vắng" },
    ...tinh_hinh_hoc_tap.headers.map((item) => ({
      key: item.assignment_group_id,
      label: `${item.group_name} (${item.weight}%)`,
    })),
    {
      key: "diem_qua_trinh",
      label: "Điểm quá trình",
    },
  ];

  const [sortDescriptor, setSortDescriptor] = useState(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const pages = Math.ceil(tinh_hinh_hoc_tap.body.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tinh_hinh_hoc_tap.body
      .map((item, index) => ({ ...item, stt: index + 1, ho_ten: item.hovaten }))
      .slice(start, end);
  }, [page, tinh_hinh_hoc_tap.body]);

  // console.log(tinh_hinh_hoc_tap);

  const sortedItems = useMemo(() => {
    // console.log(Number(sortDescriptor?.column));
    return sortDescriptor === null
      ? items
      : [...items].sort((a, b) => {
          if (Number(sortDescriptor?.column)) {
            const first = a.group_submissions.find(
              (item) =>
                item.assignment_group_id === Number(sortDescriptor?.column)
            ).grade;
            const second = b.group_submissions.find(
              (item) =>
                item.assignment_group_id === Number(sortDescriptor?.column)
            ).grade;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
          } else {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
          }
        });
  }, [sortDescriptor, items]);

  // console.log(sortedItems);
  return (
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
              <TableCell className="whitespace-nowrap">{item.ho_ten}</TableCell>
              <TableCell>
                <Link href={`/sinh_vien/${item.sinh_vien_id}`}>
                  {item.code}
                </Link>
              </TableCell>
              <TableCell>{item.ma_lop_hanh_chinh}</TableCell>
              <TableCell>
                <div className="h-[20px] flex">
                  <div
                    className="bg-red-500 overflow-hidden text-center text-white rounded-l-sm "
                    style={{ width: item.tinhhinh ? item.tinhhinh + "%" : 0 }}
                  >
                    {/* <span>{item.tinhhinh + "%"}</span> */}
                  </div>
                  <div
                    className="bg-green-500 text-white text-center rounded-r-sm"
                    style={{ width: 100 - item.tinhhinh + "%" }}
                  >
                    {/* <span>{100 - item.tinhhinh + "%"}</span> */}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {item.tong_tiet_vang ? item.tong_tiet_vang : 0}
              </TableCell>
              {/* <TableCell>{item.ma_lop_hanh_chinh}</TableCell> */}
              {item.group_submissions.map((el) => (
                <TableCell key={el.assignment_group_id}>
                  {parseFloat(el.grade)}
                </TableCell>
              ))}
              <TableCell>{parseFloat(item.diem_qua_trinh)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TinhHinh;
