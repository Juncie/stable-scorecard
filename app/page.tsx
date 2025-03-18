import MultiStepForm from "@/components/MultiStepForm";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Image src="/images/stableBG.jpg" fill className="object-cover" alt="" />
      {/* span overlay */}
      <span className="absolute inset-0 bg-black/35" />
      {/* main content */}
      <MultiStepForm />
    </>
  );
}
