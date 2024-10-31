import axios from "axios";

//Get lich hoc trong ngay
export const getLop = async (token, id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_LOP}/${id}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      //   authorization: `Bearer ${token}`,
    },
  });

  return res;
};
