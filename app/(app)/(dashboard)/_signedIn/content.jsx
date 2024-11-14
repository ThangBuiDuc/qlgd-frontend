"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import TKB from "./tkb";
import Lop from "./lop";
import { useAuth, useClerk } from "@clerk/clerk-react";

const NotSignedOut = () => {
  // const { isSignedIn } = useAuth();
  // const clerk = useClerk();

  // if (!isSignedIn) clerk.redirectToSignIn();

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
        <Tab key="luuy" title="Lưu ý">
          <TKB />
        </Tab>
      </Tabs>
    </div>
  );
};

export default NotSignedOut;
