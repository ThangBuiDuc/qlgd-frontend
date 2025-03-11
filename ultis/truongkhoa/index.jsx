import axios from "axios";
import FormData from "form-data";

//Get thong tin lop
export const getLopTruongKhoa = async (token, id, tenant) => {
  const link = new URL(`${process.env.NEXT_PUBLIC_API_TRUONG_KHOA}/lop/${id}`);
  const res = await axios({
    url: `${link.origin}${
      tenant.hocky && tenant.namhoc
        ? `/hocky/${tenant.hocky}/namhoc/${tenant.namhoc}`
        : ""
    }${link.pathname}`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Get lich trinh lop
export const getLichTrinhLopTruongKhoa = async (token, id, tenant) => {
  const link = new URL(
    `${process.env.NEXT_PUBLIC_API_TRUONG_KHOA}/lop/${id}/lichtrinh`
  );
  const res = await axios({
    url: `${link.origin}${
      tenant.hocky && tenant.namhoc
        ? `/hocky/${tenant.hocky}/namhoc/${tenant.namhoc}`
        : ""
    }${link.pathname}`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Get lich hinh lop
export const getTinhHinhLopTruongKhoa = async (token, id, tenant) => {
  const link = new URL(
    `${process.env.NEXT_PUBLIC_API_TRUONG_KHOA}/lop/${id}/tinhhinh`
  );
  const res = await axios({
    url: `${link.origin}${
      tenant.hocky && tenant.namhoc
        ? `/hocky/${tenant.hocky}/namhoc/${tenant.namhoc}`
        : ""
    }${link.pathname}`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//duyet lop Truong Khoa
export const duyetTruongKhoa = async (token, data) => {
  const formData = new FormData();
  formData.append("lop_id", data.lop_id);
  formData.append("type", data.type);
  formData.append("maction", data.maction);
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_TRUONG_KHOA}/update`,
    method: "POST",
    data: formData,
    headers: {
      "content-type": "multipart/form-data",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//get role truong khoa
export const truongKhoaRole = async (token, tenant) => {
  const link = new URL(`${process.env.NEXT_PUBLIC_API_ROLE_TRUONG_KHOA}`);
  const res = await axios({
    url: `${link.origin}${
      tenant.hocky && tenant.namhoc
        ? `/hocky/${tenant.hocky}/namhoc/${tenant.namhoc}`
        : ""
    }${link.pathname}`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res;
};

//get thong tin giang vien khoa
export const getThongTinGiangVienKhoa = async (token, id, tenant) => {
  const link = new URL(`${process.env.NEXT_PUBLIC_API_TRUONG_KHOA}/${id}`);
  const res = await axios({
    url: `${link.origin}${
      tenant.hocky && tenant.namhoc
        ? `/hocky/${tenant.hocky}/namhoc/${tenant.namhoc}`
        : ""
    }${link.pathname}`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};
