"use client";
import { Tooltip } from "@nextui-org/tooltip";
import { Settings, CircleX } from "lucide-react";
const Diem = ({ data }) => {
  return (
    <div className="pl-2 pt-2 pb-2 flex justify-between">
      <p>
        {`${data.name}, điểm tối đa: `}{" "}
        <span className="font-semibold">{data.points}</span>
      </p>
      <div className="flex gap-2">
        <Tooltip content="Sửa" color="success">
          <Settings className="cursor-pointer" />
        </Tooltip>
        {data.can_destroy && (
          <Tooltip content="Xoá" color="danger">
            <CircleX className="cursor-pointer" />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Diem;
