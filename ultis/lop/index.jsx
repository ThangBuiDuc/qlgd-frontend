import axios from "axios";

//Get lich hoc trong ngay
export const getLop = async (token, id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_LOP}/${id}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      ...(token ? { jwt: `Bearer ${token}` } : {}),
      //   authorization: `Bearer ${token}`,
    },
  });

  return res;
};

//Get chi tiet lop giang vien
export const getChiTietLopGiangVien = async (token, lop_id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_CHI_TIET_LOP_GIANG_VIEN}/${lop_id}/group_submissions`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};
