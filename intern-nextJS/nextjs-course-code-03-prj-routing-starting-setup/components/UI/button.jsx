import Link from "next/link";
import css from "./button.module.css";

export default function Button(props) {
  return (
    <Link href={props.href} className={css.btn}>
      {props.children}
    </Link>
  );
}
