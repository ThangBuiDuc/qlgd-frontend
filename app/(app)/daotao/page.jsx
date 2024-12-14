import { daoTaoRole } from "@/ultis/daotao";
import { auth } from "@clerk/nextjs/server";
import Content from "./content";

const Page = async () => {
  const { getToken } = await auth();
  const role = await daoTaoRole(
    await getToken({
      template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
    })
  );

  if (role.status !== 200) {
    throw new Error();
  }

  if (!role.data.authorized)
    return (
      <div className="flex justify-center">
        <h5>Thầy/Cô không có quyền sử dụng chức năng này</h5>
      </div>
    );

  if (!role.data.is_dao_tao && !role.data.is_dao_tao_duyet)
    return (
      <div className="flex justify-center">
        <h5>Thầy/Cô không có quyền sử dụng chức năng này</h5>
      </div>
    );
  return <Content role={role.data} />;
  //   return <p>1</p>;
};

export default Page;
