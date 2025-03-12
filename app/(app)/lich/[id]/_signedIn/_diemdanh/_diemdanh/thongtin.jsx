"use client";
import Loading from "@/app/_hardComponents/loading";
import { hoanThanhBuoiHoc } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/clerk-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheckBig } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ThongTin = ({ data, lop_id, isActionable }) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const [isMutation, setIsMutaion] = useState(false);
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () =>
      hoanThanhBuoiHoc(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        lop_id,
        { ...data, lop_id }
      ),
    onSuccess: (data) => {
      toast.success("Hoàn thành buổi học thành công!", {
        position: "top-center",
      });
      setIsMutaion(false);
      // queryClient.invalidateQueries(["diem_danh_lich", params.id]);
      queryClient.setQueryData(
        [
          "diem_danh_lich",
          params.id,
          searchParams.get("hocky"),
          searchParams.get("namhoc"),
        ],
        data
      );
    },
    onError: () => {
      setIsMutaion(false);
      toast.error("Hoàn thành buổi học không thành công!", {
        position: "top-center",
      });
    },
  });
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <p>Thông tin buổi học:</p>
        <Table
          isStriped
          aria-label="Thong tin buoi hoc"
          classNames={{
            th: ["!bg-[#006FEE]", "text-white"],
            // //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>Phòng</TableColumn>
            <TableColumn>Loại</TableColumn>
            <TableColumn>Số tiết</TableColumn>
            <TableColumn>Số sinh viên có mặt</TableColumn>
            <TableColumn>Số sinh viên vắng</TableColumn>
            <TableColumn>Giờ học</TableColumn>
            <TableColumn>Trạng thái</TableColumn>
            <TableColumn>Thao tác</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{data.phong}</TableCell>
              <TableCell>{data.type_status}</TableCell>
              <TableCell>{data.so_tiet}</TableCell>
              <TableCell>{data.sv_co_mat}</TableCell>
              <TableCell>{data.sv_vang_mat}</TableCell>
              <TableCell>{data.alias_state}</TableCell>
              <TableCell>{data.alias_status}</TableCell>
              <TableCell>
                {isMutation ? (
                  <Loading size={"sm"} />
                ) : isActionable ? (
                  data.updated && (
                    <Tooltip
                      content="Hoàn thành buổi học"
                      color="primary"
                      closeDelay={0}
                    >
                      <CircleCheckBig
                        className="cursor-pointer"
                        onClick={() => {
                          setIsMutaion(true);
                          mutation.mutate();
                        }}
                      />
                    </Tooltip>
                  )
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ThongTin;
