import axios from "axios";

//Get lich hoc trong ngay
export const getCalendar = async (id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_CALENDAR}/${id}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
    },
  });

  return res;
};
