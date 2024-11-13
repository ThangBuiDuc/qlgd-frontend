import axios from "axios";

//Get lich hoc trong ngay
export const getCurrentCalendar = async (token) => {
  // console.log(token);
  const res = await axios({
    url: process.env.NEXT_PUBLIC_API_GET_CURRENT_CALENDAR,
    method: "get",
    headers: {
      "content-type": "Application/json",
      ...(token ? { jwt: `Bearer ${token}` } : {}),
      //   authorization: `Bearer ${token}`,
    },
  });

  return res;
};
