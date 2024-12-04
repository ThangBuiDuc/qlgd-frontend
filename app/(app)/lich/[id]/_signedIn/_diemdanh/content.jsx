"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useParams } from "next/navigation";
import DiemDanhTab from "./_diemdanh/content";
import NoiDungTab from "./_noidung/content";
import LichTrinhDuKien from "./_lichtrinhdukien/content";
import DeCuongDuKien from "./_decuongdukien/content";

const DiemDanh = () => {
  const params = useParams();
  return (
    <Tabs
      aria-label="Options"
      color="primary"
      classNames={{
        tabContent: "text-black",
        panel: "[&>div]:shadow-none",
      }}
    >
      <Tab key="main" title="Điểm danh">
        <DiemDanhTab params={params} />
      </Tab>
      <Tab key="content" title="Nội dung giảng dạy">
        <NoiDungTab params={params} />
      </Tab>
      <Tab key="calendar" title="Lịch trình dự kiến">
        <LichTrinhDuKien params={params} />
      </Tab>
      <Tab key="outline" title="Đề cương dự kiến">
        <DeCuongDuKien params={params} />
      </Tab>
    </Tabs>
  );
};

export default DiemDanh;
