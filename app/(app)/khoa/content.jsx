"use client";

import Loading from "@/app/_hardComponents/loading";
import { getThongTinGiangVienKhoa } from "@/ultis/truongkhoa";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import Link from "next/link";

const Content = ({ khoa_id }) => {
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["giang_vien_truong_khoa", khoa_id],
    queryFn: async () =>
      getThongTinGiangVienKhoa(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        khoa_id
      ),
  });

  //   console.log(data);
  if (isLoading) return <Loading />;
  return (
    <Accordion variant="bordered">
      {data?.map((item, index) => {
        return (
          <AccordionItem
            key={item.giang_vien_id}
            aria-label={item.ten_giang_vien}
            title={`${index + 1}: ${item.ten_giang_vien}`}
          >
            <Table
              isStriped
              aria-label="Danh sach lop"
              classNames={{
                th: ["!bg-[#006FEE]", "text-white"],
                //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
              }}
            >
              <TableHeader>
                <TableColumn>STT</TableColumn>
                <TableColumn>Mã lớp</TableColumn>
                <TableColumn>Tên môn học</TableColumn>
                <TableColumn>Thông số lớp</TableColumn>
                <TableColumn>Lịch trình thực hiện</TableColumn>
                <TableColumn>Theo dõi tình hình</TableColumn>
              </TableHeader>
              <TableBody>
                {item.data.map((el, i) => (
                  <TableRow key={el.lop_mon_hoc_id}>
                    <TableCell className="whitespace-nowrap ">
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      <Link href={`/lop/${el.lop_mon_hoc_id}`}>
                        {el.ma_lop}
                      </Link>
                    </TableCell>
                    <TableCell>{el.ten_mon_hoc}</TableCell>
                    <TableCell>{el.duyet_thong_so_status}</TableCell>
                    <TableCell>{el.duyet_lich_trinh_status}</TableCell>
                    <TableCell>{el.duyet_tinh_hinh_status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Content;
