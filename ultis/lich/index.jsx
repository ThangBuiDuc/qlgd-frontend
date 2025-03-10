import axios from "axios";

//Get lich hoc trong ngay
export const getCalendar = async (token, id, tenant) => {
  const link = new URL(`${process.env.NEXT_PUBLIC_API_GET_CALENDAR}/${id}`);
  const res = await axios({
    url: `${link.origin}${
      tenant.hocky && tenant.namhoc
        ? `/hocky/${tenant.hocky}/namhoc/${tenant.namhoc}`
        : ""
    }${link.pathname}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res;
};
