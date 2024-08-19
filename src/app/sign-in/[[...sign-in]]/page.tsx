import { SignIn } from "@clerk/nextjs";
import Content from "@/app/Components/Content";

export default function Page() {
  return (
    <div className="flex items-center  justify-center flex-col gap-10 mt-20">
      <SignIn />
      <Content />
    </div>
  );
}
