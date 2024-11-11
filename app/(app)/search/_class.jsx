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
import useSWR from "swr";
import { useRouter } from "next/navigation";

const Class = () => {
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
      `search_class`,
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
        aria-label="Tim kiem lop mon hoc"
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
          <TableColumn>Mã lớp</TableColumn>
          <TableColumn>Tên môn học</TableColumn>
          <TableColumn>Giảng viên</TableColumn>
          <TableColumn>Sĩ số</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"Không tìm thấy lớp môn học!"}
          loadingContent={
            <div className="!bg-[rgba(0,0,0,0.2)] z-10 h-full w-full flex justify-center items-center">
              <Spinner color="primary" />
            </div>
          }
          isLoading={isLoading}
        >
          {data?.lop_mon_hocs.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                {index + (data?.page.current_page - 1) * 50 + 1}
              </TableCell>
              <TableCell>
                <Link href={`/lop/${item.id}`}>{item.ma_lop}</Link>
              </TableCell>
              <TableCell>{item.ten_mon_hoc}</TableCell>
              <TableCell>{item.giang_vien}</TableCell>
              <TableCell>{item.siso}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Class;
