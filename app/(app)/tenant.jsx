"use client";
import { useSearchParams } from "next/navigation";
const Tenant = () => {
  const searchParams = useSearchParams();
  //   console.log(searchParams.has("hocky"));
  return (
    <>
      {searchParams.has("hocky") && searchParams.has("namhoc") ? (
        <p className="font-semibold">
          Học kỳ {searchParams.get("hocky")} - Năm học{" "}
          {searchParams.get("namhoc")} - Read Only
        </p>
      ) : (
        <></>
      )}
    </>
  );
};

export default Tenant;
