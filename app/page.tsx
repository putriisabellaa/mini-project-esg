import { redirect } from "next/navigation";

export default function Home() {
  redirect("/en-US");
  return null;
}