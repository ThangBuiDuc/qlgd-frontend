import axios from "axios";

//Get lich hoc trong ngay
export const getCurrentCalendar = async (token, tenant) => {
  // console.log(token);
  // console.log(Object.keys(tenant).length === 0);
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_CURRENT_CALENDAR}${
      tenant.hocky && tenant.namhoc
        ? `/hocky/${tenant.hocky}/namhoc/${tenant.namhoc}`
        : ""
    }`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      ...(token ? { jwt: `Bearer ${token}` } : {}),
      //   authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// `${ slug?.length === 2 ? `/hocky/${slug[0]}/namhoc/${slug[1]}` : ""}`
