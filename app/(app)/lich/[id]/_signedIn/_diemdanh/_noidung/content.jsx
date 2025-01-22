"use client";

import Loading from "@/app/_hardComponents/loading";
import {
  getDiemDanhLop,
  getLichTrinhThucHien,
  suaNoiDungLichTrinhThucHien,
} from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ThongTin from "../_diemdanh/thongtin";
import Link from "next/link";
import { FilePenLine } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

const EditableRow = ({ data, lop_id }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [content, setContent] = useState("");
  const [isMutation, setIsMutaion] = useState(false);
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () =>
      suaNoiDungLichTrinhThucHien(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        lop_id,
        { ...data, content }
      ),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Sửa nội dung thành công!", {
        position: "top-center",
      });
      queryClient.setQueryData(["lich_trinh", lop_id], data);
      setIsEditable(false);
      setIsMutaion(false);
      setContent("");
      // queryClient.invalidateQueries(["diem_danh_lich", params.id]);
    },
    onError: () => {
      setIsMutaion(false);
      toast.error("Sửa nội dung không thành công!", {
        position: "top-center",
      });
    },
  });
  return (
    <div key={data.id} className="pt-2 pb-2 flex flex-col gap-2">
      <div className="flex gap-2">
        <Tooltip content="Sửa nội dung" color="primary" closeDelay={0}>
          <FilePenLine
            className="cursor-pointer"
            onClick={() => {
              setIsEditable(true);
              setContent("");
            }}
          />
        </Tooltip>
        <Link href={`/lich/${data.id}`}>
          Tuần {data.tuan}: {data.thoi_gian}
        </Link>
      </div>
      {isEditable ? (
        <div className="flex flex-col gap-2">
          <Textarea
            // className="max-w-xs"
            label="Nội dung buổi học"
            placeholder="Nội dung buổi học..."
            variant="bordered"
            value={content}
            onValueChange={setContent}
          />
          <div className="flex justify-center gap-2">
            {isMutation ? (
              <Loading />
            ) : (
              <>
                <Button
                  className="w-fit"
                  onClick={() => {
                    setIsEditable(false);
                    setContent("");
                  }}
                >
                  Huỷ
                </Button>
                <Button
                  isDisabled={!content}
                  className="w-fit"
                  color="primary"
                  onClick={() => {
                    setIsMutaion(true);
                    mutation.mutate();
                  }}
                >
                  Cập nhật
                </Button>
              </>
            )}
          </div>
        </div>
      ) : (
        data.content_html && (
          <div
            className="p-2"
            dangerouslySetInnerHTML={{ __html: data.content_html }}
          />
        )
      )}
    </div>
  );
};

const NoiDungTab = ({ params }) => {
  const { getToken } = useAuth();
  const { data: thongtin, isLoadingThongTin } = useQuery({
    queryKey: ["diem_danh_lich", params.id],
    queryFn: async () =>
      getDiemDanhLop(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id
      ),
  });

  const { data: lichtrinh, isLoadingLichTrinh } = useQuery({
    queryKey: ["lich_trinh", thongtin.info.lop.id],
    queryFn: async () =>
      getLichTrinhThucHien(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        thongtin.info.lop.id
      ),
    enabled: !!thongtin.info.lop.id,
  });

  if (isLoadingThongTin && isLoadingLichTrinh) return <Loading />;

  return (
    <div className="flex flex-col gap-5">
      <ThongTin data={thongtin.info.lich} />
      <h5>Lịch trình thực hiện</h5>
      {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
      <div className="divide-y-1 pl-2">
        {lichtrinh?.map((item) =>
          item.updated ? (
            <EditableRow
              data={item}
              lop_id={thongtin.info.lop.id}
              key={item.id}
            />
          ) : (
            <div key={item.id} className="pt-2 pb-2">
              <Link href={`/lich/${item.id}`}>
                Tuần {item.tuan}: {item.thoi_gian}
              </Link>
              <div
                className="p-2"
                dangerouslySetInnerHTML={{ __html: item.content_html }}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NoiDungTab;
