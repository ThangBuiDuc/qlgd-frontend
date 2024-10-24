import axios from "axios";

//Get lich hoc trong ngay
export const getCurrentCalendar = async () => {
  const res = await axios({
    url: process.env.NEXT_PUBLIC_API_GET_CURRENT_CALENDAR,
    method: "get",
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
    },
  });

  return res;
};
