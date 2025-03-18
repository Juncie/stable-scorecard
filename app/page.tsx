import MultiStepForm from "@/components/MultiStepForm";
export default function Home() {
  return (
    <>
      <div className="bg-[url(/images/stableBG.jpg)] bg-cover bg-center relative bg-fixed">
        <span className="absolute inset-0 bg-black/35" />
        <MultiStepForm />
      </div>
    </>
  );
}
