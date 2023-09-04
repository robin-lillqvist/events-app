import { useRouter } from "next/router";

function FilteredEventsPage() {
  const router = useRouter();
  console.log(router.query);

  return (
    <div>
      <h1>Filtered events page</h1>
    </div>
  );
}

export default FilteredEventsPage;
