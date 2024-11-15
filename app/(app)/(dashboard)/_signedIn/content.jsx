"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import TKB from "./tkb";
import Lop from "./lop";

const NotSignedOut = () => {
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
        <Tab key="tkb" title="Thời khoá biểu">
          <TKB />
        </Tab>
        <Tab key="danhsach" title="Danh sách lớp">
          <Lop />
        </Tab>
      </Tabs>
    </div>
  );
};

export default NotSignedOut;
