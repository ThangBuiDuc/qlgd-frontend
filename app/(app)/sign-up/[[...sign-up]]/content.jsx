"use client";
import { useState, useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";
// import { useNavigate } from "react-router";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import ReactInputVerificationCode from "react-input-verification-code";
import axios from "axios";

export default function Content() {
  const [progress, setProgress] = useState("");
  const [codeProgress, setCodeProgress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(ref)

  // const {isSignedIn} = useAuth();

  // const navigate = useNavigate();

  const { isLoaded, signUp, setActive } = useSignUp();

  useEffect(() => {
    async function verify() {
      await signUp
        .attemptEmailAddressVerification({ code: verifyCode })
        .then(async (result) => {
          if (result.status === "complete") {
            await axios("/api/signUp", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                id: `${result.createdUserId}`,
                magv: `${result.username.substring(
                  0,
                  result.username.length - 1
                )}`,
                fullname: name,
              },
            }).then((res) => {
              if (res.status === 200) {
                setActive({ session: result.createdSessionId });
                window.location.href = "/";
                // setCodeProgress("is incorrect");
                // console.log(isSignedIn)
              }
            });
          }
        })
        .catch(() => {
          //   console.log("error", err.errors[0].message);
          setCodeProgress("is incorrect");
          setVerifyCode("");
        });
    }
    if (verifyCode.length === 6) {
      verify();
    }
  }, [verifyCode]);

  //   const handleOncompleted = async () => {
  //     console.log(verifyCode)
  // if (verifyCode[4] !== ".") {
  //     console.log(verifyCode)
  //   await signUp
  //     .attemptEmailAddressVerification({ code: verifyCode })
  //     .then((result) => console.log(result))
  //     .catch((err) => {
  //     //   console.log("error", err.errors[0].message);
  //       setCodeProgress("is incorrect")
  //       setVerifyCode("");
  //     });
  // }
  //   };

  if (!isLoaded) {
    // handle loading state
    return null;
  }

  async function submit(e) {
    e.preventDefault();
    setProgress("");
    if (emailAddress === "" || password === "") {
      setProgress("empty");
      setLoading(false);
    } else {
      // Check the sign up response to
      // decide what to do next.
      setLoading(true);
      if (emailAddress.includes("@hpu.edu.vn")) {
        await fetch(`${progress.env.NEXT_PUBLIC_API_SIGN_UP}${emailAddress}`)
          .then((res) => res.json())
          .then(async (res) => {
            if (res.result.length !== 0) {
              setName(res.result[0].name);
              await signUp
                .create({
                  emailAddress: emailAddress,
                  password: password,
                  username: res.result[0].magiaovien + "z",
                })
                .then(async (result) => {
                  if (result.status === "missing_requirements") {
                    setProgress(result.status);
                  }
                  await signUp.prepareEmailAddressVerification();
                })
                .catch((err) => {
                  // console.log("error", err.errors[0].message);
                  setProgress(err.errors[0].message);
                  setLoading(false);
                });
              // setProgress('missing_requirements')
            } else {
              setProgress("none");
              setLoading(false);
            }
          });
      } else {
        setProgress("invalid");
        setLoading(false);
      }
      //   await fetch(`${process.env.REACT_APP_API_SIGN_UP}${emailAddress}`)
      //     .then((res) => res.json())
      //     .then(async (res) => {
      //       if (res.verify.length === 0) setProgress("invalidCode");
      //       else if (res.verify[0].email && res.verify[0].email !== emailAddress){
      //         setProgress("unduplicated");
      //         setVerifyEmail(res.verify[0].email);
      //       }

      //       else if (!res.verify[0].email) setProgress("emptyEmail");

      //       if (res.verify.length !== 0 && res.verify[0].email === emailAddress) {
      //         setName(res.verify[0].hoten);
      //         await signUp
      //           .create({
      //             emailAddress: emailAddress,
      //             password: password,
      //             username: username + "z",
      //           })
      //           .then(async (result) => {
      //             if (result.status === "missing_requirements") {
      //               setProgress(result.status);
      //             }
      //             await signUp
      //               .prepareEmailAddressVerification()
      //               .then((result) => console.log(result))
      //               .catch((err) => console.log("error", err.errors[0].message));
      //           })
      //           .catch((err) => {
      //             // console.log("error", err.errors[0].message);
      //             setProgress(err.errors[0].message);
      //           });
      //         // setProgress('missing_requirements')
      //       }

      //       // console.log(res)
      //     })
      //     // .catch((e)=>{
      //     //   setLoading(false);
      //     //   // console.log("1")
      //     // })
      //     .finally(() => {
      //       setLoading(false);
      //     });
      // }
    }
  }

  return progress === "missing_requirements" ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        className="w-full flex justify-center"
        style={{ flexDirection: "column", display: "flex", gap: "10px" }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Xác thực</h2>
        <p>
          Một mã xác thực đã được gửi đến email bạn đăng ký. Vui lòng xác thực
          để tiếp tục sử dụng.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            pointerEvents: verifyCode.length === 6 ? "none" : "unset",
          }}
        >
          <ReactInputVerificationCode
            placeholder=""
            onChange={setVerifyCode}
            value={verifyCode}
            autoFocus={true}
            length={6}
          />
        </div>
        {codeProgress === "is incorrect" ? (
          <p style={{ color: "red", fontSize: "12px" }}>
            Mã xác thực sai. Vui lòng nhập lại!
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="flex flex-col border-[solid_1px_rgb(0_0_0_/_25%)] rounded-[35px] gap-[20px] p-[20px] md:shadow-[rgba(0,0,0,0.35)_0px_5px_15px]">
        <h3 style={{ color: "black", textAlign: "center" }}>Đăng ký</h3>
        <form
          className="flex flex-col gap-[20px] p-[10px] [&>div]:w-[280px] [&>div]:g-[5px] [&>div]:flex [&>div]:flex-col"
          onSubmit={submit}
        >
          {/* <div>
            <input
              type="text"
              value={username}
              className={style.input}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Mã sinh viên"
            />
            {progress === "That username is taken. Please try another." ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                Mã sinh viên đã được đăng ký! Liên hệ phòng quản trị mạng( Tầng
                2 - Nhà G ) nếu có sai sót!
              </p>
            ) : (
              <></>
            )}
          </div> */}
          <div>
            {/* <label htmlFor="email">Email</label> */}
            <Input
              variant="bordered"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              type="email"
              label="Email"
              placeholder="example@gmail.com"
            />
            {progress === "That email address is taken. Please try another." ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                Email đã được đăng ký!
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
            {progress === "Passwords must be 8 characters or more." ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                Mật khẩu phải dài hơn 8 ký tự!
              </p>
            ) : progress === "invalid" ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                Vui lòng nhập email @hpu.edu.vn
              </p>
            ) : progress === "empty" ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                Vui lòng nhập đủ thông tin!
              </p>
            ) : progress ===
              "Password has been found in an online data breach.  For account safety, please use a different password." ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                Mật khẩu yếu. Nhập mật khẩu mạnh hơn!
              </p>
            ) : progress === "none" ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                Email không tồn tại trong hệ thống!
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
                Đăng ký
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
