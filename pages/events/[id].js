import { useRouter } from "next/router";

function SpecificEventPage() {
  const router = useRouter();
  console.log(router.query);

  return (
    <div>
      <h1>Specific events page!</h1>
    </div>
  );
}

export default SpecificEventPage;
