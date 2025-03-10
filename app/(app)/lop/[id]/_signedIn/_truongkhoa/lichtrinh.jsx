"use client";

import Loading from "@/app/_hardComponents/loading";
import { getLichTrinhLopTruongKhoa } from "@/ultis/truongkhoa";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";

const LichTrinhTruongKhoa = ({
  lop,
  params,
  isMutating,
  setIsMutating,
  updateMutation,
}) => {
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["truong_khoa_lop_lich_trinh", params.id],
    queryFn: async () =>
      getLichTrinhLopTruongKhoa(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id
      ),
  });
  return isLoading ? (
    <Loading size={"sm"} />
  ) : (
    <div className="flex flex-col gap-2">
      {isMutating ? (
        <div className="w-fit">
          <Loading size={"sm"} />
        </div>
      ) : (
        <>
          {lop.can_approve_lich_trinh && (
            <Button
              color="success"
              className="w-fit"
              onClick={() => {
                setIsMutating(true);
                updateMutation.mutate({ type: 2, maction: 1 });
              }}
            >
              Duyệt
            </Button>
          )}
          {lop.can_reject_lich_trinh && (
            <Button
              color="warning"
              className="w-fit"
              onClick={() => {
                setIsMutating(true);
                updateMutation.mutate({ type: 2, maction: 0 });
              }}
            >
              Không duyệt
            </Button>
          )}
        </>
      )}
      <Table
        isStriped
        aria-label="Thong tin lich trinh lop truong khoa"
        classNames={{
          th: ["!bg-green-200"],
          //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>Tuần</TableColumn>
          <TableColumn>Nội dung</TableColumn>
          <TableColumn>Số tiết</TableColumn>
          <TableColumn>Thời gian</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"Hiện tại chưa có lịch trình!"}>
          {data.map((item) => (
            <TableRow key={item.tuan}>
              <TableCell>{item.tuan}</TableCell>
              <TableCell>
                <span dangerouslySetInnerHTML={{ __html: item.noi_dung }} />
              </TableCell>
              <TableCell>{item.so_tiet}</TableCell>
              <TableCell>
                <span dangerouslySetInnerHTML={{ __html: item.thoi_gian }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LichTrinhTruongKhoa;
