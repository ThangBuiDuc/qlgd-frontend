"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import moment from "moment";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Pagination } from "@nextui-org/pagination";

const BuoiHoc = ({ data }) => {
  const [sortDescriptor, setSortDescriptor] = useState(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data
      .map((item, index) => ({ ...item, stt: ++index }))
      .slice(start, end);
  }, [page, data]);

  const sortedItems = useMemo(() => {
    return sortDescriptor === null
      ? items
      : [...items].sort((a, b) => {
          // console.log(a);
          //   console.log(sortDescriptor);
          const first = a[sortDescriptor.column];
          const second = b[sortDescriptor.column];
          const cmp =
            sortDescriptor === "thoi_gian"
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
      <h5>Các buổi đã học/vắng</h5>
      <Table
        isStriped
        aria-label="Cac buoi da hoc/vang"
        isHeaderSticky
        className="max-h-full"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          th: ["!bg-[#006FEE]", "text-white"],
          //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
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
          <TableColumn key={"stt"} allowsSorting>
            STT
          </TableColumn>
          <TableColumn key={"thoi_gian"} allowsSorting>
            Thời gian
          </TableColumn>
          <TableColumn key={"phong"} allowsSorting>
            Phòng
          </TableColumn>
          <TableColumn key={"so_tiet"} allowsSorting>
            Số tiết
          </TableColumn>
          <TableColumn key={"ten_mon_hoc"} allowsSorting>
            Thông tin lớp
          </TableColumn>
          <TableColumn key={"giang_vien_hovaten"} allowsSorting>
            Giảng viên
          </TableColumn>
          <TableColumn key={"summary"} allowsSorting>
            Nội dung
          </TableColumn>
          <TableColumn key={"danh_sach_vangs"} allowsSorting>
            Sinh viên vắng
          </TableColumn>
        </TableHeader>
        <TableBody
        // isLoading={isLoading}
        // loadingContent={<Spinner />}
        >
          {sortedItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.stt}</TableCell>
              <TableCell className="whitespace-nowrap">
                <Link
                  href={`/lich/${item.id}`}
                  // className="hover:underline text-[#0083C2] cursor-pointer"
                >
                  {`${moment(item.thoi_gian).format("HH:mm DD/MM/yyyy")} ${
                    item.state === "bosung" ? "BS" : ""
                  }`}
                </Link>
              </TableCell>
              <TableCell>{item.phong}</TableCell>
              <TableCell>{item.so_tiet}</TableCell>
              <TableCell>
                <Link
                  href={`/lop/${item.lop_mon_hoc_id}`}
                  // className="hover:underline text-[#0083C2] cursor-pointer"
                >
                  {item.ma_lop}
                </Link>
                <br />
                {item.ten_mon_hoc}
              </TableCell>
              <TableCell className="whitespace-nowrap">{`${item.giang_vien_hovaten}`}</TableCell>
              <TableCell>{item.summary}</TableCell>
              <TableCell>
                {item.danh_sach_vangs.map((el) => (
                  <>
                    <Link
                      href={`/sinh_vien/${el.id}`}
                      // className="hover:underline text-[#0083C2] cursor-pointer"
                      className="whitespace-nowrap"
                    >
                      {`${el.hovaten} (${el.so_tiet_vang}t)`}
                    </Link>
                    <br />
                  </>
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
