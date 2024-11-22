"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { default as NotSignedOutLop } from "@/app/(app)/lop/[id]/_signedIn/content";
import DiemDanh from "./_diemdanh/content";

const NotSignedOut = ({ lop }) => {
  // console.log(lop);
  return (
    <Accordion variant="bordered" defaultExpandedKeys={["0"]}>
      <AccordionItem
        key={"0"}
        aria-label={"thong tin lop hoc"}
        title={`Thông tin lớp học`}
      >
        <NotSignedOutLop lop={lop} lich={true} />
      </AccordionItem>
      <AccordionItem key={"1"} aria-label={"diem danh"} title={`Điểm danh`}>
        <DiemDanh />
      </AccordionItem>
      <AccordionItem key="2" aria-label={"diem"} title={`Điểm`}></AccordionItem>
    </Accordion>
  );
};

export default NotSignedOut;
