"use client";

import Loading from "@/app/_hardComponents/loading";
import { Button } from "@nextui-org/button";

const DeCuongTruongKhoa = ({
  lop,
  isMutating,
  setIsMutating,
  updateMutation,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {isMutating ? (
        <Loading size={"sm"} />
      ) : (
        <>
          {lop.can_approve_thong_so && (
            <Button
              color="success"
              className="w-fit"
              onClick={() => {
                setIsMutating(true);
                updateMutation.mutate({ type: 1, maction: 1 });
              }}
            >
              Duyệt
            </Button>
          )}
          {lop.can_reject_thong_so && (
            <Button color="warning" className="w-fit">
              Không duyệt
            </Button>
          )}
        </>
      )}
      <div dangerouslySetInnerHTML={{ __html: lop.de_cuong_chi_tiet_html }} />
    </div>
  );
};

export default DeCuongTruongKhoa;
