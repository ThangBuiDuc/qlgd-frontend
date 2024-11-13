import Footer from "../_hardComponents/footer";
import Header from "../_hardComponents/header";
import Search from "../_hardComponents/search";
import { currentUser } from "@clerk/nextjs/server";

const Layout = async ({ children }) => {
  const user = await currentUser();

  // console.log(user.emailAddresses[0].emailAddress);

  // if (user)
  //   return (
  //     <div className="flex flex-col gap-4">
  //       <Header />
  //       <main className="pr-[10vw] pl-[10vw] min-h-[82vh]">
  //         <div className="flex flex-col gap-3">
  //           <Search />
  //           <p>Chào bạn {user.primaryEmailAddress}</p>
  //           {children}
  //         </div>
  //       </main>
  //       <Footer />
  //     </div>
  //   );

  return (
    <div className="flex flex-col gap-4">
      <Header />
      <main className="pr-[10vw] pl-[10vw] min-h-[82vh]">
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
