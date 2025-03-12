"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import ThongTin from "./_giangvien/_thongtin/thongtin";

import ThietLapNhomDiem from "./_giangvien/_thietlapnhomdiem/thietlapnhomdiem";
import ThongTinLop from "./_giangvien/_thongtin/thongtinlop";
import Diem from "./_giangvien/_diem/diem";
import BoSung from "./_giangvien/_bosung/content";
import TKB from "./_giangvien/_tkb/content";
import { useParams, useSearchParams } from "next/navigation";
import ThietLap from "./_giangvien/_thietlap/content";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { duyetTruongKhoa, getLopTruongKhoa } from "@/ultis/truongkhoa";
import { useAuth } from "@clerk/clerk-react";
import { default as ThongTinLopTruongKhoa } from "./_truongkhoa/thongtin";
import Loading from "@/app/_hardComponents/loading";
import DeCuongTruongKhoa from "./_truongkhoa/decuong";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import LichTrinhTruongKhoa from "./_truongkhoa/lichtrinh";
import TinhHinhTruongKhoa from "./_truongkhoa/tinhhinh";
import { useState } from "react";
import { toast } from "sonner";
const NotSignedOut = ({ lop, chi_tiet_lop, lich, truongkhoa }) => {
  const searchParams = useSearchParams();
  const isActionable =
    searchParams.get("hocky") && searchParams.get("namhoc") ? false : true;
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const params = useParams();
  const [isMutating, setIsMutating] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: [
      "truong_khoa_lop",
      params.id,
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getLopTruongKhoa(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        params.id,
        { hocky: searchParams.get("hocky"), namhoc: searchParams.get("namhoc") }
      ),
    enabled: !!truongkhoa,
  });

  const updateMutation = useMutation({
    mutationFn: async (data) =>
      duyetTruongKhoa(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        { ...data, lop_id: params.id }
      ),
    onSuccess: (data) => {
      setIsMutating(false);
      queryClient.setQueryData(
        [
          "truong_khoa_lop",
          params.id,
          searchParams.get("hocky"),
          searchParams.get("namhoc"),
        ],
        data
      );
      // queryClient.invalidateQueries(["lop_chi_tiet_gv", params.id]);
      toast.success("Thao tác thành công!", {
        position: "top-center",
      });
    },
    onError: () => {
      setIsMutating(false);
      toast.error("Thao tác không thành công!", {
        position: "top-center",
      });
    },
  });

  return truongkhoa ? (
    isLoading ? (
      <Loading />
    ) : (
      <div className="flex w-full flex-col gap-4">
        <ThongTinLopTruongKhoa lop={data} />
        <Accordion variant="bordered">
          <AccordionItem aria-label="De cuong" title={`Đề cương chi tiết`}>
            <DeCuongTruongKhoa
              isActionable={isActionable}
              lop={data}
              isMutating={isMutating}
              setIsMutating={setIsMutating}
              updateMutation={updateMutation}
            />
          </AccordionItem>
          <AccordionItem
            aria-label="Lich trinh thuc hien"
            title={`Lịch trình thực hiện`}
          >
            <LichTrinhTruongKhoa
              isActionable={isActionable}
              lop={data}
              params={params}
              isMutating={isMutating}
              setIsMutating={setIsMutating}
              updateMutation={updateMutation}
            />
          </AccordionItem>
          <AccordionItem
            aria-label="Tinh hinh hoc tap"
            title={`Tình hình học tập`}
          >
            <TinhHinhTruongKhoa
              isActionable={isActionable}
              lop={data}
              params={params}
              isMutating={isMutating}
              setIsMutating={setIsMutating}
              updateMutation={updateMutation}
            />
          </AccordionItem>
        </Accordion>
        {/* <Tabs
          aria-label="Options"
          color="primary"
          classNames={{
            tabContent: "text-black",
            panel: "[&>div]:shadow-none",
          }}
        >
          <Tab key="decuong" title="Đề cương chi tiết">
            <DeCuong />
          </Tab>
        </Tabs> */}
      </div>
    )
  ) : (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        classNames={{
          tabContent: "text-black",
          panel: "[&>div]:shadow-none",
        }}
      >
        <Tab key="main" title="Thông tin chung">
          <div className="flex flex-col gap-5">
            <ThongTin lop={lop} />
            {chi_tiet_lop && (
              <ThongTinLop chi_tiet_lop={chi_tiet_lop} params={params} />
            )}
          </div>
        </Tab>
        <Tab key="setting" title="Thiết lập thông số">
          <ThietLap lop={lop} params={params} isActionable={isActionable} />
        </Tab>
        <Tab key="scoresetting" title="Thiết lập nhóm điểm">
          <ThietLapNhomDiem
            params={{ id: lop.id }}
            isActionable={isActionable}
          />
        </Tab>
        {!lich && (
          <Tab key="score" title="Điểm">
            <Diem params={{ id: lop.id }} />
          </Tab>
        )}
        <Tab key="signmore" title="Đăng ký bổ sung">
          <BoSung params={{ id: lop.id }} isActionable={isActionable} />
        </Tab>
        <Tab key="tkb" title="Thời khoá biểu">
          <TKB params={{ id: lop.id }} isActionable={isActionable} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default NotSignedOut;
