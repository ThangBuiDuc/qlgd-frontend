"use cliet";
import { Tooltip } from "@nextui-org/tooltip";
import { CircleX, ArchiveRestore, PenOff } from "lucide-react";

const RowNghiDay = ({ data, params }) => {
  return (
    <div className="flex gap-2">
      {data.can_unnghiday && (
        <Tooltip content="Huỷ đăng ký" color="primary" closeDelay={0}>
          <PenOff
            className="cursor-pointer"
            onClick={() => setUpdateModal(true)}
          />
        </Tooltip>
      )}
      {data.can_remove && (
        <Tooltip content="Xoá" color="danger" closeDelay={0}>
          <CircleX
            className="cursor-pointer"
            onClick={() => setUpdateModal(true)}
          />
        </Tooltip>
      )}
      {data.can_restore && (
        <Tooltip content="Phục hồi" closeDelay={0}>
          <ArchiveRestore
            className="cursor-pointer"
            onClick={() => setUpdateModal(true)}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default RowNghiDay;
