"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
// import { useParams } from "next/navigation";
import { default as DiemLop } from "@/app/(app)/lop/[id]/_signedIn/_diem/diem";

const Diem = ({ lop }) => {
  //   const params = useParams();
  console.log(lop);
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
        <DiemLop params={lop.id} />
      </Tab>
      <Tab key="diemnhom" title="Điểm nhóm">
        <></>
      </Tab>
    </Tabs>
  );
};

export default Diem;
