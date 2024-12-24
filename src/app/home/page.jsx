import styles from "./page.module.css";
import Button from "../../components/Button/Button";
import AnimationLottie from "@/components/helper/animation-lottie";
import admin from "../../../public/admin.json";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div>
          <h1 className={`${styles.title}`}>AdminZ</h1>
          <h1 className={styles.title}>DashBoard</h1>
        </div>
        <p className={styles.desc}>
          Developed a management system with an admin dashboard featuring user
          and product management.
        </p>
        <Button url="/login" text="Get Started" />
      </div>
      <div className={`${styles.item2}`}>
        <AnimationLottie animationPath={admin} />
      </div>
    </div>
  );
}
