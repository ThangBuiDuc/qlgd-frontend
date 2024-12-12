import axios from "axios";
import FormData from "form-data";

//Get lich trinh giang day
export const getLopTruongKhoa = async (token, id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_TRUONG_KHOA}/lop/${id}`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//duyet Truong Khoa
export const duyetTruongKhoa = async (token, data) => {
  const formData = new FormData();
  formData.append("lop_id", data.lop_id);
  formData.append("type", data.type);
  formData.append("maction", data.maction);
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_TRUONG_KHOA}/update`,
    method: "POST",
    data: formData,
    headers: {
      "content-type": "multipart/form-data",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};
