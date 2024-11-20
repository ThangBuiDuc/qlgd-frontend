"use client";

import { getChiTietLopGiangVien2 } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Settings } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";

const Diem = () => {
  const { getToken } = useAuth();
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["lop_chi_tiet_gv2", params.id],
    queryFn: async () =>
      getChiTietLopGiangVien2(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id
      ),
  });

  if (isLoading) return <Spinner color="primary" />;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Button color="primary">
          Tính điểm chuyên cần (cột điểm đầu tiên)
        </Button>
        <Button color="primary">
          Hoàn thành lớp học (khoá lớp: Không sửa điểm được)
        </Button>
      </div>
      <Table
        aria-label="Danh sach lop"
        isStriped
        classNames={{
          th: ["!bg-green-200", "text-black"],
          // tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>Họ và tên</TableColumn>
          <TableColumn>Tình hình đi học</TableColumn>
          {data?.headers?.map((item) => (
            <TableColumn
              key={item.assignment_id}
            >{`${item.assignment_name} (${item.points})`}</TableColumn>
          ))}
          <TableColumn>Điểm quá trình</TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody>
          {data.results.map((item) => (
            <TableRow key={item.enrollment_group_id}>
              <TableCell>
                {item.hovaten}
                <br />
                {item.code}
                <br />
                {item.ma_lop_hanh_chinh}
              </TableCell>
              <TableCell>
                <div className="h-[20px] flex">
                  <div
                    className="bg-green-500 text-white text-center rounded-l-sm"
                    style={{ width: 100 - item.tinhhinh + "%" }}
                  >
                    <span>{100 - item.tinhhinh + "%"}</span>
                  </div>
                  <div
                    className="bg-red-500 overflow-hidden text-center text-white rounded-r-sm"
                    style={{ width: item.tinhhinh ? item.tinhhinh + "%" : 0 }}
                  >
                    <span>{item.tinhhinh + "%"}</span>
                  </div>
                </div>
              </TableCell>
              {item.submissions.map((el, index) => (
                <TableCell key={index}>{el.grade}</TableCell>
              ))}
              <TableCell>{item.diem_qua_trinh}</TableCell>
              <TableCell>
                <Tooltip content="Sửa" color="success" closeDelay={0}>
                  <Settings className="cursor-pointer" />
                </Tooltip>
              </TableCell>
              {/* <TableCell>1</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Diem;
