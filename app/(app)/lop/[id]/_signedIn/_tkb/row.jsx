"use cliet";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Settings,
  SquarePen,
  CircleX,
  ArchiveRestore,
  Undo2,
} from "lucide-react";

const Row = ({ data, params }) => {
  return (
    <>
      <div className="flex gap-2">
        {data.can_nghiday && (
          <Tooltip content="Đăng ký nghỉ" color="warning" closeDelay={0}>
            <SquarePen
              className="cursor-pointer"
              onClick={() => setUpdateModal(true)}
            />
          </Tooltip>
        )}
        {data.can_edit && (
          <Tooltip content="Sửa" color="success" closeDelay={0}>
            <Settings
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
        {data.can_uncomplete && (
          <Tooltip content="Huỷ hoàn thành" color="primary" closeDelay={0}>
            <Undo2
              className="cursor-pointer"
              onClick={() => setUpdateModal(true)}
            />
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default Row;
