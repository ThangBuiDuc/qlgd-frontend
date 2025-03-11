import axios from "axios";

//Get lich hoc trong ngay
export const getSinhVien = async (id, tenant) => {
  const link = new URL(`${process.env.NEXT_PUBLIC_API_GET_SINH_VIEN}/${id}`);
  const res = await axios({
    url: `${link.origin}${
      tenant.hocky && tenant.namhoc
        ? `/hocky/${tenant.hocky}/namhoc/${tenant.namhoc}`
        : ""
    }${link.pathname}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
    },
  });

  return res;
};
