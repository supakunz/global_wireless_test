import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const HomeFooter = () => {
  return (
    <div className={styles.container}>
      <div>©2024 Developer ❤️ by Supakun Thata</div>
      <div className={styles.social}>
        <Image
          src="/image/footer/1.png"
          width={15}
          height={15}
          className={styles.icon}
          alt="Lama Dev Facebook"
        />
        <Image
          src="/image/footer/2.png"
          width={15}
          height={15}
          className={styles.icon}
          alt="Lama Dev Instagram"
        />
        <Image
          src="/image/footer/3.png"
          width={15}
          height={15}
          className={styles.icon}
          alt="Lama Dev Twitter"
        />
        <Image
          src="/image/footer/4.png"
          width={15}
          height={15}
          className={styles.icon}
          alt="Lama Dev Youtube"
        />
      </div>
    </div>
  );
};

export default HomeFooter;
