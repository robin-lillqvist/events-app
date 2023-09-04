import { useRouter } from "next/router";
import Link from "next/link";

function Events() {
  const router = useRouter();
  console.log(router.query);

  return (
    <div>
      <h1>Events Page</h1>
      <ul>
        <li>
          <Link href="/events/100">Event 100</Link>
        </li>
        <li>
          <Link href="/events/101">Event 101</Link>
        </li>
      </ul>
    </div>
  );
}

export default Events;
