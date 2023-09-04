import { Fragment } from "react";
import { getFeaturedEvents } from "../dummyData.js";
import EventList from "../components/events/event-list.js";
import EventsSearch from "./events/events-search.js";

export default function Home() {
  const events = getFeaturedEvents();

  return (
    <Fragment>
      <EventsSearch />
      <EventList events={events} />
    </Fragment>
  );
}
