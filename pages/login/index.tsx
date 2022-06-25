import { useEffect, useState } from "react";
import Load from "../../components/loading";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import SHA3 from "crypto-js/sha3";

export default function Login() {
  const router = useRouter();
  const { url } = router.query;
  const [loggingin, setLoggingIn] = useState<boolean>(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleIdChange = (e: any) => {
    setId(e.target.value);
  };

  const handlePwChange = (e: any) => {
    setPw(e.target.value);
  };

  const enterHandler = (e: any) => {
    if (e.keyCode == 13) {
      handleClick();
    }
  };

  const toToken = () => {
    let tokens = "";
    for (let i = 0; i < Math.max(id.length, pw.length); i++) {
      let dta = id.charCodeAt(i % (id.length - 1));
      let dtb = pw.charCodeAt(i % (pw.length - 1));
      let dtc = dta + dtb;
      tokens += (dtc * 2.9).toString(36);
    }
    return SHA3(tokens).toString();
  };

  const handleClick = async () => {
    setLoggingIn(true);
    if (id == "") {
      setLoggingIn(false);
      toast.error("ID is empty.");
      return;
    }
    if (pw == "") {
      setLoggingIn(false);
      toast.error("Password is empty.");
      return;
    }
    let g = (await (await axios.get(`/api/login/${id}/${pw}`)).data) as any;
    if (g.State == "Fail") {
      setLoggingIn(false);
      toast.error("ID or PW is wrong. Or account is missing.");
    } else {
      setLoggingIn(false);
      localStorage.setItem("auth_token", toToken());
      localStorage.setItem("username", decodeURI(g.UserName));
      toast.success("Successfully logged in");
      if (url == undefined) router.push("/");
      else router.push(decodeURI(url as string));
    }
  };

  return (
    <>
      {loggingin ? <Load /> : null}
      <header
        style={{
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginBottom: "0px",
          }}
        >
          Login to Jungol.ac
        </h1>
        <h3
          style={{
            marginTop: "10px",
          }}
        >
          with jungol.co.kr account
        </h3>
      </header>
      <section
        style={{
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="ID"
          style={{
            fontSize: "14px",
            width: "80vw",
            maxWidth: "400px",
            padding: "4px 12px",
          }}
          value={id}
          onChange={handleIdChange}
          onKeyUp={enterHandler}
        ></input>
        <p
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            fontSize: "3px",
          }}
        >
          &nbsp;
        </p>
        <input
          type="password"
          placeholder="Password"
          style={{
            fontSize: "14px",
            width: "80vw",
            maxWidth: "400px",
            padding: "4px 12px",
          }}
          value={pw}
          onChange={handlePwChange}
          onKeyUp={enterHandler}
        ></input>
        <p
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            fontSize: "3px",
          }}
        >
          &nbsp;
        </p>
        <button
          style={{
            fontSize: "14px",
            width: "80vw",
            maxWidth: "400px",
            padding: "4px 12px",
            borderRadius: "5px",
            color: "black",
            border: "none",
            backgroundColor: "#efefef",
          }}
          onClick={handleClick}
        >
          Login
        </button>
      </section>
    </>
  );
}