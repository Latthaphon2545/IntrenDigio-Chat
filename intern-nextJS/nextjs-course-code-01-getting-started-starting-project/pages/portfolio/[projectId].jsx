import { useRouter } from "next/router";

export default function portfolio() {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  return <div>portfolio</div>;
}
