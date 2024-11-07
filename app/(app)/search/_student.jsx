"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import Link from "next/link";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { search } from "@/ultis/search";
import { Spinner } from "@nextui-org/spinner";

const Student = ({ results }) => {
  const searchParams = useSearchParams();
  const pageSearchParam = parseInt(searchParams.get("page"));
  const querySearchParam = searchParams.get("q");
  const typeSearchParam = parseInt(searchParams.get("type"));
  // console.log(results);
  const [page, setPage] = useState(pageSearchParam ? pageSearchParam : 1);

  const { data, isFetching, isPending } = useQuery({
    queryKey: [
      "search_sv",
      {
        page: page ? page : 1,
        query: querySearchParam,
        type: typeSearchParam,
      },
    ],
    queryFn: () =>
      search({
        type: typeSearchParam,
        query: querySearchParam,
        page: page ? page : 1,
      }),
    placeholderData: keepPreviousData,
    // initialData: results,
    // staleTime: Infinity,
  });

  if (isPending) return <p>loading</p>;

  return (
    <>
      <Table
        aria-label="Tim kiem sinh vien"
        classNames={{
          emptyWrapper: ["!text-black"],
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
              total={data.page.total_page}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>STT</TableColumn>
          <TableColumn>Họ và tên</TableColumn>
          <TableColumn>Mã sinh viên</TableColumn>
          <TableColumn>Lớp hành chính</TableColumn>
          <TableColumn>Số lớp môn</TableColumn>
          <TableColumn>Số tiết vắng</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"Không tìm thấy sinh viên!"}
          loadingContent={
            <div className="!bg-[rgba(0,0,0,0.2)] z-10 h-full w-full flex justify-center items-center">
              <Spinner color="primary" />
            </div>
          }
          // isLoading={isFetching}
        >
          {data.sinh_vien.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{++index}</TableCell>
              <TableCell>{`${item.ho} ${item.dem} ${item.ten}`}</TableCell>
              <TableCell>
                <Link href={"#"}>{item.code}</Link>
              </TableCell>
              <TableCell>{item.ma_lop_hanh_chinh}</TableCell>
              <TableCell>{item.so_lop_mon}</TableCell>
              <TableCell>{item.so_tiet_vang}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Student;
