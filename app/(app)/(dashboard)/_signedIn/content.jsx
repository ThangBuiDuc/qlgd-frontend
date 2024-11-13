"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import TKB from "./tkb";

const NotSignedOut = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        classNames={{ tabContent: "text-black" }}
      >
        <Tab key="tkb" title="Thời khoá biểu">
          <Card>
            <CardBody>
              <TKB />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="danhsach" title="Danh sách lớp">
          <Card>
            <CardBody>
              <TKB />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="luuy" title="Lưu ý">
          <Card>
            <CardBody>
              <TKB />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default NotSignedOut;
