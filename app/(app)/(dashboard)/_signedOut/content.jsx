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
import moment from "moment";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useAsyncList } from "@react-stately/data";
import { Spinner } from "@nextui-org/spinner";

const header = [
  { key: "thoi_gian", label: "Thời gian" },
  { key: "so_tiet", label: "Số tiết" },
  { key: "phong", label: "Phòng" },
  { key: "giang_vien", label: "Giảng viên" },
  { key: "ma_lop", label: "Mã lớp" },
  { key: "mon", label: "Môn" },
  { key: "si_so", label: "Sĩ số" },
  { key: "noi_dung", label: "Nội dung" },
];

function flattenObjectNoParentKeys(obj, result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenObjectNoParentKeys(value, result);
    } else {
      result[key] = value;
    }
  }
  return result;
}

const NotSignedIn = ({ calendar }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [sortDescriptor, setSortDescriptor] = useState(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const pages = Math.ceil(calendar.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return calendar.slice(start, end);
  }, [page, calendar]);

  const sortedItems = useMemo(() => {
    return sortDescriptor === null
      ? items
      : [...items].sort((a, b) => {
          let column;
          switch (sortDescriptor.column) {
            case "thoi_gian": {
              column = "thoi_gian";
              break;
            }
            case "so_tiet": {
              column = "so_tiet";
              break;
            }
            case "phong": {
              column = "phong";
              break;
            }
            case "giang_vien": {
              column = "ho";
              break;
            }
            case "ma_lop": {
              column = "ma_lop";
              break;
            }
            case "mon": {
              column = "ten_mon_hoc";
              break;
            }
            case "si_so": {
              column = "si_so";
              break;
            }
            case "noi_dung": {
              column = "summary";
              break;
            }
          }
          // console.log(a);
          const first = flattenObjectNoParentKeys(a)[column];
          const second = flattenObjectNoParentKeys(b)[column];
          const cmp =
            column === "thoi_gian"
              ? moment(moment(first)).diff(moment(second))
              : first < second
              ? -1
              : first > second
              ? 1
              : 0;

          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
  }, [sortDescriptor, items]);

  return (
    <div className="flex flex-col gap-2">
      <h5>Lịch học trong ngày</h5>
      <Table
        aria-label="Lich hoc trong ngay"
        isHeaderSticky
        className="max-h-full"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          th: ["!bg-green-200", "text-black"],
          tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
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
      >
        <TableHeader>
          {header.map((item) => (
            <TableColumn key={item.key} allowsSorting>
              {item.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
        // isLoading={isLoading}
        // loadingContent={<Spinner />}
        >
          {sortedItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link
                  href={"#"}
                  className="hover:underline text-[#0083C2] cursor-pointer"
                >
                  {`${moment(item.thoi_gian).format("HH:mm DD/MM/yyyy")} ${
                    item.state === "bosung" ? "BS" : ""
                  }`}
                </Link>
              </TableCell>
              <TableCell>{item.so_tiet}</TableCell>
              <TableCell className="whitespace-nowrap">
                <Link
                  href={"#"}
                  className="hover:underline text-[#0083C2] cursor-pointer"
                >
                  {`${item.phong ? item.phong : ""}${
                    item.summary.length ? "*" : ""
                  }`}
                </Link>
                <br />
                {item.type_status}
              </TableCell>
              <TableCell className="whitespace-nowrap">{`${item.giang_vien.ho} ${item.giang_vien.dem} ${item.giang_vien.ten}`}</TableCell>
              <TableCell>
                <Link
                  href={"#"}
                  className="hover:underline text-[#0083C2] cursor-pointer"
                >
                  {item.lop_mon_hoc.ma_lop}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={"#"}
                  className="hover:underline text-[#0083C2] cursor-pointer"
                >
                  {item.lop_mon_hoc.ten_mon_hoc}
                </Link>
              </TableCell>
              <TableCell>{`${item.comat}/${item.lop_mon_hoc.si_so}`}</TableCell>
              <TableCell>{item.summary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NotSignedIn;
