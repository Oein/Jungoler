import type { AppProps } from "next/app";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { scaleDown as Menu } from "react-burger-menu";
import Link from "next/link";
import NoSSR from "react-no-ssr";
import Head from "next/head";
import { useEffect, useState } from "react";
import ErrorPage from "next/error";
import axios from "axios";

const bans: string[] = require("../bans.json");

function MyApp({ Component, pageProps }: AppProps) {
  let [menuOpened, setMenuOpened] = useState(false);
  let [banned, setBanned] = useState(false);
  let [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/login/isAdmin/${window.localStorage.auth_token}`)
      .then((res) => {
        if (res.data == "T") {
          setIsAdmin(true);
        }
      })
      .catch((e) => {});
  });

  const open = () => {
    setMenuOpened(true);
  };
  const close = () => {
    setMenuOpened(false);
  };

  const banPage = (
    <>
      <ToastContainer
        closeOnClick={false}
        closeButton={false}
        autoClose={false}
        position="bottom-left"
      />
      <ErrorPage statusCode={444} title={"You are banned from server!"} />
    </>
  );

  const retu = (
    <div
      id="outer-container"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        overflow: "auto",
      }}
    >
      <Head>
        <meta name="author" content="Oein" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jungoler.vercel.app/" />
        <meta property="og:site_name" content="Jungoler" />
        <meta
          property="description"
          name="description"
          content="Jungol.co.kr을 사용하는 사람들의 모임"
        />
        <meta
          property="og:description"
          content="Jungol.co.kr을 사용하는 사람들의 모임"
        />
      </Head>
      <Menu
        pageWrapId="page-warp"
        outerContainerId="outer-container"
        isOpen={menuOpened}
        onClose={() => {
          close();
        }}
        onOpen={() => {
          open();
        }}
      >
        <NoSSR>
          <div
            style={{
              borderBottom: "1px solid gray",
              marginBottom: "14.720px",
            }}
          >
            <Link
              href={
                typeof window !== "undefined" &&
                localStorage.getItem("username") != null
                  ? "/logout/"
                  : "/login/"
              }
              style={{
                color: "white",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={close}
              >
                {typeof window !== "undefined" &&
                localStorage.getItem("username") != null ? (
                  <>
                    Welcome,{" "}
                    <h2
                      style={{
                        display: "inline",
                      }}
                    >
                      {localStorage.getItem("username")}!
                    </h2>
                    <p
                      style={{
                        padding: "0px",
                        margin: "0px",
                        paddingLeft: "15px",
                      }}
                    >
                      Log out
                    </p>
                  </>
                ) : (
                  "Login"
                )}
              </div>
            </Link>
          </div>
        </NoSSR>
        <div
          style={{
            borderBottom: "1px solid gray",
            marginBottom: "14.720px",
            paddingBottom: "14.720px",
          }}
        >
          <Link href="/">
            <h1
              style={{
                margin: "0",
                padding: "0",
                cursor: "pointer",
              }}
              onClick={close}
            >
              Jungoler
            </h1>
          </Link>
          <Link href="/JungolAC">
            <div
              onClick={close}
              style={{ cursor: "pointer", padding: "0px", margin: "0px" }}
            >
              {" "}
              - Jungol.ac
            </div>
          </Link>
          <p>&nbsp;</p>
          <h3
            style={{
              margin: "0",
              padding: "0",
            }}
          >
            Our OpenAPIs
          </h3>
          <Link href="/Docs/Login/">
            <div onClick={close} style={{ cursor: "pointer", padding: "0px" }}>
              {" "}
              - Login API
            </div>
          </Link>
        </div>
        {isAdmin ? (
          <Link href="/admin/">
            <h2
              onClick={close}
              style={{ cursor: "pointer", margin: "0", padding: "0" }}
            >
              Admin Panel
            </h2>
          </Link>
        ) : null}
      </Menu>
      <main id="page-warp">
        <div
          style={{
            marginTop: "90px",
          }}
        ></div>
        <Component {...pageProps} />
      </main>
      <ToastContainer
        autoClose={3000}
        position="bottom-left"
        closeOnClick
        newestOnTop={false}
      />
    </div>
  );

  useEffect(() => {
    let at = window.localStorage.getItem("auth_token");
    if (at && bans.includes(at)) {
      setBanned(true);
      toast.error("You are banned from server");
    }
  });

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          textAlign: "center",
          backgroundColor: "#000000",
          color: "#FFFFFF",
        }}
      >
        Alert : 샘들이 solved.ac랑 협업해서 rank기능을 만들고 있데요. solved.ac
        업데이트 되면 이 사이트 폭⭐️8 식을 여러분들과 한컴 discord에서 진행할
        겁니다.
      </div>
      {banned ? banPage : retu}
    </>
  );
}

export default MyApp;
