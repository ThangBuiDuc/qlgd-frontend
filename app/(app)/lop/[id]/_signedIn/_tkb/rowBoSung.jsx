"use cliet";
import { Tooltip } from "@nextui-org/tooltip";
import { CircleX, ArchiveRestore, Undo2 } from "lucide-react";

const RowBoSung = ({ data, params }) => {
  return (
    <>
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
      {data.can_uncomplete && (
        <Tooltip content="Huỷ hoàn thành" color="primary" closeDelay={0}>
          <Undo2
            className="cursor-pointer"
            onClick={() => setUpdateModal(true)}
          />
        </Tooltip>
      )}
    </>
  );
};

export default RowBoSung;
