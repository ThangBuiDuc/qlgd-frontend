import axios from "axios";

//Get lich hoc trong ngay
export const getGiangVien = async (id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_GIANG_VIEN}/${id}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
    },
  });

  return res;
};
