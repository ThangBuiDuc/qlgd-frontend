"use client";
import { useSignIn } from "@clerk/nextjs";
// import logo from "../../img/logoLogin.png";
import { useState } from "react";
// import { toast } from "react-toastify";
// import { StatusMobileNav } from "../../App";
// import { useContext } from "react";
// import { useSignIn } from "@clerk/clerk-react";
import { BiArrowBack } from "react-icons/bi";
import { Spinner } from "@nextui-org/spinner";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const Content = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const [forGotPass, setForGotPass] = useState(false);

  // console.log(location.hash.substring(16, location.hash.length));
  // console.log(
  //   decodeURIComponent(location.hash.substring(16, location.hash.length))
  // );

  const { isLoaded, signIn, setActive } = useSignIn();

  const forGot = () => {
    setForGotPass(!forGotPass);
    setProgress("");
  };

  // var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  // // console.log(email.match(pattern))

  if (!isLoaded) {
    // handle loading state
    return null;
  }

  async function submit(e) {
    e.preventDefault();
    setProgress("");
    setLoading(true);
    if (email === "") {
      setProgress("blankEmail");
      setLoading(false);
    } else if (email.includes("@hpu.edu.vn")) {
      // var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // Check the sign in response to
      // decide what to do next.
      await signIn
        .create({
          identifier: email,
          password,
        })
        .then(async (result) => {
          if (result.status === "complete")
            setActive({ session: result.createdSessionId });
        })
        .catch((err) => {
          if (email === "") setProgress("blankEmail");
          else setProgress(err.errors[0].message);
          setLoading(false);
        });
    } else {
      setProgress("Couldn't find your account.");
      setLoading(false);
    }
  }

  async function submit1(e) {
    e.preventDefault();
    // alert('clicked!')
    // Prepare sign in with strategy and identifier
    setLoading(true);
    // console.log(email)
    if (email.includes("@hpu.edu.vn")) {
      await signIn
        .create({
          strategy: "email_link",
          identifier: email,
          redirectUrl: `${window.location.origin}/reset-password`,
        })
        .then((res) => {
          if (res.status === "needs_first_factor")
            setProgress("forGotPassSent");
          setLoading(false);
        })
        .catch((err) => {
          setProgress(err.errors[0].message);
          setLoading(false);
        });
    } else {
      setProgress("Couldn't find your account.");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      {forGotPass ? (
        <div className="flex flex-col border-[solid_1px_rgb(0_0_0_/_25%)] rounded-[35px] gap-[20px] p-[20px] md:shadow-[rgba(0,0,0,0.35)_0px_5px_15px]">
          <div>
            <button
              style={{
                padding: "0",
                backgroundColor: "unset",
                border: "none",
                cursor: "pointer",
              }}
              onClick={forGot}
            >
              <BiArrowBack style={{ fontSize: "35px" }} />
            </button>
          </div>
          <h3 style={{ color: "black", textAlign: "center" }}>Quên mật khẩu</h3>
          <form
            className="flex flex-col gap-[20px] p-[10px] [&>div]:w-[280px] [&>div]:g-[5px] [&>div]:flex [&>div]:flex-col"
            onSubmit={submit1}
          >
            <div>
              {/* <label>Email</label> */}
              {/* <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[15px] bg-[rgba(0,0,0,0.038)] px-3.5 p-2.5 rounded-[15px] border-[solid_1px_rgb(0_0_0_/_25%)] hover:border-[solid_1px_rgb(0_0_0)] focus:boder-[solid_1px_rbg(0_0_0)]"
                placeholder="Email"
              /> */}

              <Input
                variant="bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                placeholder="example@gmail.com"
              />

              {progress === "Couldn't find your account." ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Email không tồn tại trong hệ thống!
                </p>
              ) : (
                <></>
              )}
            </div>
            <div>
              {loading ? (
                <Spinner size="sm" color="primary" />
              ) : progress === "forGotPassSent" ? (
                <p style={{ color: "green", fontSize: "14px" }}>
                  Một đường link đặt lại mật khẩu đã được gửi đến Email!
                </p>
              ) : (
                <Button color="primary" size="sm" className="w-fit self-center">
                  Xác nhận
                </Button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col border-[solid_1px_rgb(0_0_0_/_25%)] rounded-[35px] gap-[20px] p-[20px] md:shadow-[rgba(0,0,0,0.35)_0px_5px_15px]">
          <h3 style={{ color: "black", textAlign: "center" }}>Đăng nhập</h3>
          <form
            className="flex flex-col gap-[20px] p-[10px] [&>div]:w-[280px] [&>div]:g-[5px] [&>div]:flex [&>div]:flex-col"
            onSubmit={submit}
          >
            <div>
              {/* <label>Email hoặc mã sinh viên</label> */}
              <Input
                variant="bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                placeholder="example@gmail.com"
              />
              {progress === "blankEmail" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Vui lòng nhập email hoặc mã giáo viên!
                </p>
              ) : progress === "Couldn't find your account." ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Email hoặc mã giáo viên không tồn tại!
                </p>
              ) : (
                <></>
              )}
            </div>
            <div>
              {/* <label htmlFor="password">Mật khẩu</label> */}

              <Input
                variant="bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Mật khẩu"
              />
              {progress === "Enter password." && email !== "" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Vui lòng nhập mật khẩu!
                </p>
              ) : progress ===
                "Password is incorrect. Try again, or use another method." ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Mật khẩu không chính xác!
                </p>
              ) : (
                <></>
              )}
            </div>
            <div>
              {loading ? (
                <Spinner size="sm" color="primary" />
              ) : (
                <Button color="primary" size="sm" className="w-fit self-center">
                  Đăng nhập
                </Button>
              )}
            </div>
          </form>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{
                background: "none",
                border: "none",
                padding: "0",
                color: "#069",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={forGot}
            >
              Quên mật khẩu
            </button>
            <Link
              href="/sign-up"
              style={{
                fontSize: "14px",
                textDecoration: "unset",
                color: "#069",
              }}
            >
              Đăng ký
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
