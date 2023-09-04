import { Fragment } from "react";
import { getAllEvents } from "../dummyData.js";
import EventList from "../components/events/event-list.js";
import EventsSearch from "./events/events-search.js";

console.log(events);

export default function Home() {
  return (
    <Fragment>
      <EventsSearch />
      <EventList events={events} />
    </Fragment>
  );
}
