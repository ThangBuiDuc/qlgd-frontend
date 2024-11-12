import axios from "axios";

//Get lich hoc trong ngay
export const getSinhVien = async (id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_SINH_VIEN}/${id}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
    },
  });

  return res;
};
