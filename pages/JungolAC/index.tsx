import type { NextPage } from "next";
import style from "./index.module.css";
import { AiOutlineGithub } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
const FHeader = dynamic(import("../../components/Fheader"));

const problems = require("./../../rank.json");
const sl = require("../../solvedaclink.json");

const Home: NextPage = () => {
  let [searchvalue, setSearchValue] = useState("");
  let [searchAutoComplete, setSearchAC] = useState<any[]>([]);
  let [maxCountOfSearchedProblems, setMaxCountOfSearchedProblems] = useState(5);

  const problemKey = Object.keys(problems);

  const onlyNumbers = (str: string) => {
    return /^[0-9]+$/.test(str);
  };

  const searchMaxValueChangeHandler = (e: any) => {
    setMaxCountOfSearchedProblems(e.target.value);
    let someThing = { target: { value: searchvalue } };
    searchValueChangeHandler(someThing, e.target.value as number);
  };

  const searchValueChangeHandler = (
    e: any,
    cnt: number = maxCountOfSearchedProblems
  ) => {
    let data = e.target.value;
    setSearchValue(e.target.value);
    if (data.length === 0) {
      setSearchAC([]);
      return;
    }

    let filterData: Object[] = [];
    problemKey.map((key, i) => {
      if (
        (problems[key] as string)
          .toLocaleLowerCase()
          .includes(data.toLocaleLowerCase())
      ) {
        if (sl[key] == undefined) {
          filterData.push({ code: key, name: problems[key] as string });
        }
      } else if (
        key
          .toString()
          .toLocaleLowerCase()
          .startsWith(data.toString().toLocaleLowerCase())
      ) {
        if (sl[key] == undefined) {
          filterData.push({ code: key, name: problems[key] as string });
        }
      }
      return 0;
    });
    filterData.sort((a: any, b: any): number => {
      if (a.code == data || a.name == data) {
        return 1;
      }
      if (b.code == data || b.name == data) {
        return 1;
      }

      if (onlyNumbers(data)) {
        return (a.code as number) > (b.code as number) ? 1 : -1;
      }

      const ai = a.name.indexOf(data);
      const bi = b.name.indexOf(data);
      if (ai == bi) {
        if (a.name.length == b.name.length) return a.code > b.code ? 1 : -1;
        else return a.name.length > b.name.length ? 1 : 0;
      } else {
        return ai > bi ? 1 : -1;
      }
    });

    filterData = filterData.slice(0, cnt);

    setSearchAC(filterData);
  };
  return (
    <>
      <Head>
        <title>Jungol.ac | Main</title>
      </Head>
      <FHeader title="Jungol.ac" description="???????????? ???????????? ?????? ?????????" />
      <section>
        <h2 className={style.title}>????????????</h2>
        <article>
          <a
            href="https://github.com/Oein/JungolExtensions/tree/main/JungolRankExtension"
            className={style.dw}
          >
            <AiOutlineGithub size={"20"} />
            <div>Download on Github</div>
          </a>
          <p style={{ margin: "0px" }}></p>
          <h4 style={{ margin: "0px", paddingLeft: "20px" }}>
            ??? ???????????? ????????????????
          </h4>
          <p style={{ margin: "0px", paddingLeft: "20px" }}>
            {"->"} Jungol.co.kr??? ????????? ???????????? ????????? ?????? Chrome Extension???
            ???????????? ???????????????!
          </p>
        </article>
      </section>

      <section>
        <h2 className={style.title}>?????? ??????</h2>
        <article>
          ??????????????? ????????? ????????? ????????? ???????????????.
          <p></p>
          ?????? ?????? , ????????? ?????? ???????????? ?????? ?????? ????????? ????????? ????????? ??????
          ?????? ?????? ban ?????? ??? ????????????.
          <p></p>
          ???????????? ?????? ???????????? ?????? ????????? solved.ac??? ????????? ????????? solved.ac
          ?????? ????????? ????????? ?????????.
        </article>
      </section>

      <section>
        <h2 className={style.title}>?????? ????????? ?????? ????????? ??????</h2>
        <div className={style.search}>
          <table className={style.tsty}>
            <tbody
              style={{
                width: "100%",
                paddingLeft: "10px",
              }}
            >
              <tr className={[style.bd, style.trw].join(" ")}>
                <td
                  style={{
                    width: "30%",
                    paddingLeft: "10px",
                  }}
                >
                  ??????
                </td>
                <td
                  style={{
                    width: "70%",
                  }}
                >
                  ????????????
                </td>
              </tr>

              <tr key={0}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Copper 5
                  </td>
                  <td>????????? ?????????, ?????? ??????</td>
                </>
              </tr>

              <tr key={1}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Copper 4
                  </td>
                  <td>if, switch ?????? ?????????</td>
                </>
              </tr>

              <tr key={2}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Copper 3
                  </td>
                  <td>for, while ?????? ?????????</td>
                </>
              </tr>

              <tr key={3}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Copper 2
                  </td>
                  <td>1?????? ??????, ?????????, ?????? ??????</td>
                </>
              </tr>

              <tr key={4}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Copper 1
                  </td>
                  <td>????????? ??????, ?????? ??????</td>
                </>
              </tr>

              <tr key={5}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Silver 5
                  </td>
                  <td>?????? ?????? ?????? ?????? ?????? ??????</td>
                </>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className={style.title}>?????? ????????? ??????</h2>
        <div
          className={style.search}
          style={{
            marginBottom: "100px",
          }}
        >
          <input
            value={searchvalue}
            placeholder="?????? ?????? or ?????? Code"
            className={style.searchInput}
            onChange={searchValueChangeHandler}
          />
          <select
            value={maxCountOfSearchedProblems}
            onChange={searchMaxValueChangeHandler}
            className={style.w50}
          >
            <optgroup label="???????????? ?????? ?????????">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </optgroup>
          </select>
          {searchAutoComplete.length > 0 ? (
            <table className={style.tsty}>
              <tbody
                style={{
                  width: "100%",
                  paddingLeft: "10px",
                }}
              >
                <tr className={[style.bd, style.trw].join(" ")}>
                  <td
                    style={{
                      width: "30%",
                      paddingLeft: "10px",
                    }}
                  >
                    ?????? Code
                  </td>
                  <td
                    style={{
                      width: "70%",
                    }}
                  >
                    ?????? ??????
                  </td>
                </tr>
                {searchAutoComplete.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <>
                        <td
                          style={{
                            paddingLeft: "10px",
                            paddingTop: "5px",
                          }}
                        >
                          <Link href={`/JungolAC/vote/${item.code}`}>
                            {item["code"]}
                          </Link>
                        </td>
                        <td>
                          <Link href={`/JungolAC/vote/${item.code}`}>
                            {item["name"]}
                          </Link>
                        </td>
                      </>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Home;
