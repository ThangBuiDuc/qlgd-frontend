"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
// import { useParams } from "next/navigation";
import { default as DiemLop } from "@/app/(app)/lop/[id]/_signedIn/_giangvien/_diem/diem";
import ThongTinLop from "@/app/(app)/lop/[id]/_signedIn/_giangvien/_thongtin/thongtinlop";

const Diem = ({ lop }) => {
  //   const params = useParams();
  console.log(lop.id);
  return (
    <Tabs
      aria-label="Options"
      color="primary"
      classNames={{
        tabContent: "text-black",
        panel: "[&>div]:shadow-none",
      }}
    >
      <Tab key="diemchitiet" title="Điểm chi tiết">
        <DiemLop params={lop} />
      </Tab>
      <Tab key="diemnhom" title="Điểm nhóm">
        <ThongTinLop params={lop} />
      </Tab>
    </Tabs>
  );
};

export default Diem;
