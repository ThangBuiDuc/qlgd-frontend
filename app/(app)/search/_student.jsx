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
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { search } from "@/ultis/search";
import { Spinner } from "@nextui-org/spinner";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const Student = () => {
  const searchParams = useSearchParams();
  const pageSearchParam = parseInt(searchParams.get("page"));
  const querySearchParam = searchParams.get("q");
  const typeSearchParam = parseInt(searchParams.get("type"));
  // console.log(results);
  const [page, setPage] = useState(pageSearchParam ? pageSearchParam : 1);
  const router = useRouter();

  // const { data, isFetching, status } = useQuery({
  //   queryKey: [
  //     "search_sv",
  //     page ? page : 1,
  //     // {
  //     //   page: page ? page : 1,
  //     //   query: querySearchParam,
  //     //   type: typeSearchParam,
  //     // },
  //   ],
  //   queryFn: () =>
  //     search({
  //       type: typeSearchParam,
  //       query: querySearchParam,
  //       page: page ? page : 1,
  //     }),
  //   placeholderData: keepPreviousData,
  //   initialData: results,
  //   // staleTime: Infinity,
  //   refetchOnMount: false,
  //   // enabled: false,
  // });
  const { data, isLoading } = useSWR(
    [
      `search_sv`,
      { page: page ? page : 1, query: querySearchParam, type: typeSearchParam },
    ],
    () =>
      search({
        type: typeSearchParam,
        query: querySearchParam,
        page: page ? page : 1,
      }),
    {
      keepPreviousData: true,
    }
  );

  // console.log(data);

  // console.log(status);

  // if (isLoading) return <Spinner color="primary" size="lg" />;

  return (
    <>
      <Table
        isStriped
        aria-label="Tim kiem sinh vien"
        classNames={{
          emptyWrapper: ["!text-black"],
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
              page={data?.page.current_page}
              total={data?.page.total_page}
              onChange={(page) => {
                router.push(
                  `/search?type=${typeSearchParam}&page=${page}&q=${querySearchParam}`
                );
                setPage(page);
              }}
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
          isLoading={isLoading}
        >
          {data?.sinh_viens.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                {index + (data?.page.current_page - 1) * 50 + 1}
              </TableCell>
              <TableCell>{`${item.ho} ${item.dem} ${item.ten}`}</TableCell>
              <TableCell>
                <Link href={`/sinh_vien/${item.id}`}>{item.code}</Link>
              </TableCell>
              <TableCell>{item.ma_lop_hanh_chinh}</TableCell>
              <TableCell>{item.so_lop_mon}</TableCell>
              <TableCell>{item.so_tiet_vang}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
    // <p>fdsfd</p>
  );
};

export default Student;
