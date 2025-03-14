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
import moment from "moment";

const Schedule = () => {
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
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    () =>
      search(
        {
          type: typeSearchParam,
          query: querySearchParam,
          page: page ? page : 1,
        },
        { hocky: searchParams.get("hocky"), namhoc: searchParams.get("namhoc") }
      ),
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
        aria-label="Tim kiem lich trinh"
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
                  `/search?type=${typeSearchParam}&page=${page}&q=${querySearchParam}${
                    searchParams.get("hocky") && searchParams.get("namhoc")
                      ? `&hocky=${searchParams.get(
                          "hocky"
                        )}&namhoc=${searchParams.get("namhoc")}`
                      : ""
                  }`
                );
                setPage(page);
              }}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>STT</TableColumn>
          <TableColumn>Thời gian</TableColumn>
          <TableColumn>Số tiết</TableColumn>
          <TableColumn>Phòng</TableColumn>
          <TableColumn>Mã lớp</TableColumn>
          <TableColumn>Tên môn học</TableColumn>
          <TableColumn>Giảng viên</TableColumn>
          <TableColumn>Sinh viên vắng</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"Không tìm thấy lịch trình!"}
          loadingContent={
            <div className="!bg-[rgba(0,0,0,0.2)] z-10 h-full w-full flex justify-center items-center">
              <Spinner color="primary" />
            </div>
          }
          isLoading={isLoading}
        >
          {data?.lichs.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                {index + (data?.page.current_page - 1) * 50 + 1}
              </TableCell>
              <TableCell>
                <Link
                  href={`/lich/${item.id}${
                    searchParams.get("hocky") && searchParams.get("namhoc")
                      ? `?hocky=${searchParams.get(
                          "hocky"
                        )}&namhoc=${searchParams.get("namhoc")}`
                      : ""
                  }`}
                >
                  {moment(item.thoi_gian).format("HH:mm DD/MM/yyyy")}
                </Link>
              </TableCell>
              <TableCell>{item.so_tiet}</TableCell>
              <TableCell>{item.phong}</TableCell>
              <TableCell>
                <Link
                  href={`/lop/${item.lop_mon_hoc.id}${
                    searchParams.get("hocky") && searchParams.get("namhoc")
                      ? `?hocky=${searchParams.get(
                          "hocky"
                        )}&namhoc=${searchParams.get("namhoc")}`
                      : ""
                  }`}
                >
                  {item.lop_mon_hoc.ma_lop}
                </Link>
              </TableCell>
              <TableCell>{item.lop_mon_hoc.ten_mon_hoc}</TableCell>
              <TableCell>
                <Link
                  href={`giang_vien/${item.giang_vien.id}${
                    searchParams.get("hocky") && searchParams.get("namhoc")
                      ? `?hocky=${searchParams.get(
                          "hocky"
                        )}&namhoc=${searchParams.get("namhoc")}`
                      : ""
                  }`}
                >
                  {item.giang_vien.hovaten}
                </Link>
              </TableCell>
              <TableCell>
                {item.danh_sach_vangs.map((el) => (
                  <>
                    <Link
                      href={`/sinh_vien/${el.id}${
                        searchParams.get("hocky") && searchParams.get("namhoc")
                          ? `?hocky=${searchParams.get(
                              "hocky"
                            )}&namhoc=${searchParams.get("namhoc")}`
                          : ""
                      }`}
                    >
                      {el.hovaten} {`(${el.so_tiet_vang}t)`}
                    </Link>
                    <br />
                  </>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Schedule;
