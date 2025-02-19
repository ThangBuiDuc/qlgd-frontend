"use client";
import style from "./index.module.css";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
// import ReactLoading from "react-loading";
import Count from "./count";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function ResetPass() {
  const [userId, setUserId] = useState("");
  const [pass, setPassword] = useState("");
  const [progress, setProgress] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(progress)
  // console.log(countSec)

  const { isSignedIn, user } = useUser();
  useEffect(() => {
    if (isSignedIn) setUserId(user.id);
  }, [isSignedIn]);

  // useEffect(() => {
  //   if (progress === "successful") setTimeout(()=>{
  //     setCountSec(e => e -1)
  //   },1000)
  // }, [countSec]);

  // console.log(progress)

  const submit = async (e) => {
    e.preventDefault();
    // console.log(isSignedIn)
    // console.log(userId)
    setProgress("");
    setLoading(true);
    if (pass === "" || repeatPass === "") setProgress("empty");
    else if (pass !== repeatPass) setProgress("notMatch");
    else {
      await fetch("/api/resetPass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          pass: pass,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res)
          setProgress(res.result);
        });
    }
    setLoading(false);
  };

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
      <div className={style.Wrapform}>
        <h3 style={{ color: "black", textAlign: "center" }}>
          Đặt lại mật khẩu
        </h3>
        <form className={style.form} onSubmit={submit}>
          <div>
            {/* <label>Mật khẩu mới</label> */}
            <Input
              variant="bordered"
              type="password"
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
              // className={style.input}
              // placeholder="Mật khẩu mới"
              label="Mật khẩu mới"
              readOnly={progress === "successful" ? true : false}
            />
          </div>
          <div>
            {/* <label>Nhập lại mật khẩu</label> */}
            <Input
              type="password"
              value={repeatPass}
              variant="bordered"
              onChange={(e) => setRepeatPass(e.target.value)}
              // className={style.input}
              // placeholder="Nhập lại mật khẩu"
              label="Nhập lại mật khẩu"
              readOnly={progress === "successful" ? true : false}
            />
            {progress === "empty" ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Vui lòng nhập đủ thông tin!
              </p>
            ) : progress === "notMatch" ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Hai mật khẩu không đồng nhất!
              </p>
            ) : progress === "Passwords must be 8 characters or more." ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Mật khẩu phải từ 8 ký tự trở lên!
              </p>
            ) : progress ===
              "Password has been found in an online data breach.  For account safety, please use a different password." ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Mật khẩu quá dễ đoán, sử dụng mật khẩu mạnh hơn!
              </p>
            ) : progress === "successful" ? (
              <Count />
            ) : (
              <></>
            )}
          </div>
          <div>
            {loading ? (
              <Spinner size="sm" color="primary" />
            ) : progress === "successful" ? (
              <></>
            ) : (
              <Button
                color="primary"
                size="sm"
                className="w-fit self-center"
                onClick={submit}
              >
                Xác nhận
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
