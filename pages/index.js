import { getAllEvents } from "../dummyData.js";
import EventList from "../components/events/event-list.js";

const events = getAllEvents();

console.log(events);

export default function Home() {
  return (
    <>
      <div>
        <EventList events={events} />
      </div>
    </>
  );
}
