import dynamic from "next/dynamic";
import Footer from "../_hardComponents/footer";
// import Header from "../_hardComponents/header";
import Search from "../_hardComponents/search";
import { currentUser } from "@clerk/nextjs/server";
const Header = dynamic(() => import("../_hardComponents/header"), {
  ssr: false,
});

const Layout = async ({ children }) => {
  const user = await currentUser();

  return (
    <div className="flex flex-col">
      <Header />
      <main className="pr-[2vw] pl-[2vw] pt-4 pb-4 lg:pr-[10vw] lg:pl-[10vw] min-h-[82vh]">
        <div className="flex flex-col gap-3">
          <Search />
          {user ? <p>Chào bạn {user.emailAddresses[0].emailAddress}</p> : <></>}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
