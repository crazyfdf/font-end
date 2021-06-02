import { Button, Input } from "antd";
import Image from "next/image";
import styles from "../styles/home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import WebItem from "./WebItem";

const { Search } = Input;
export default function Home() {
  const onSearch = value => {
    location.href = `https://www.baidu.com/s?ie=UTF-8&wd=${value}`;
  };

  return (
    <div className={styles.container} title="右键编辑">
      <main className={styles.main}>
        <Image src="/images/googlelogo.png" alt="Google Logo" width={272} height={92} />
        <div className={styles.search}>
          <Search placeholder="input search text" onSearch={onSearch} />
        </div>

        <div className={styles.grid}>
          <WebItem />
        </div>
      </main>
    </div>
  );
}
