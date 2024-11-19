"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import ThongTin from "./thongtin";

import ThietLapNhomDiem from "./_thietlapnhomdiem/thietlapnhomdiem";
const NotSignedOut = ({ lop }) => {
  return (
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
          <ThongTin lop={lop} />
        </Tab>
        <Tab key="setting" title="Thiết lập thông số">
          {/* <Lop /> */}
        </Tab>
        <Tab key="scoresetting" title="Thiết lập nhóm điểm">
          <ThietLapNhomDiem />
        </Tab>
        <Tab key="score" title="Điểm">
          {/* <Lop /> */}
        </Tab>
        <Tab key="signmore" title="Đăng ký bổ sung">
          {/* <Lop /> */}
        </Tab>
        <Tab key="tkb" title="Thời khoá biểu">
          {/* <Lop /> */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default NotSignedOut;
