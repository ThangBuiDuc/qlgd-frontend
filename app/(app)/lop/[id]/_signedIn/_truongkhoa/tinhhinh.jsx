"use client";

import Loading from "@/app/_hardComponents/loading";
import { getTinhHinhLopTruongKhoa } from "@/ultis/truongkhoa";
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

const TinhHinhTruongKhoa = ({
  lop,
  params,
  isMutating,
  setIsMutating,
  updateMutation,
}) => {
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["truong_khoa_lop_tinh_hinh", params.id],
    queryFn: async () =>
      getTinhHinhLopTruongKhoa(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id
      ),
  });

  // console.log(data);
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
          {lop.can_approve_tinh_hinh && (
            <Button
              color="success"
              className="w-fit"
              onClick={() => {
                setIsMutating(true);
                updateMutation.mutate({ type: 3, maction: 1 });
              }}
            >
              Duyệt
            </Button>
          )}
          {lop.can_reject_tinh_hinh && (
            <Button
              color="warning"
              className="w-fit"
              onClick={() => {
                setIsMutating(true);
                updateMutation.mutate({ type: 3, maction: 0 });
              }}
            >
              Không duyệt
            </Button>
          )}
        </>
      )}
      <Table
        aria-label="Thong tin lich trinh lop truong khoa"
        classNames={{
          th: ["!bg-green-200"],
          tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>STT</TableColumn>
          <TableColumn>Sinh viên</TableColumn>
          {data?.headers.map((item, index) => (
            <TableColumn key={index}>{item.tuan}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"Hiện tại chưa có lịch trình!"}>
          {data?.data.map((item, index) => (
            <TableRow key={`${item.code}${index}`}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {item.hovaten}
                <br />
                {item.code}
                <br />
                {item.ma_lop_hanh_chinh}
              </TableCell>
              {item.data.map((el, index) => (
                <TableCell key={`${el}${item.code}${index}`}>
                  {parseFloat(el)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TinhHinhTruongKhoa;
