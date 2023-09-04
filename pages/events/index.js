import { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "@/dummyData";
import EventsSearch from "./events-search";
import EventList from "@/components/events/event-list";

function Events() {
  const router = useRouter();
  const events = getAllEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </Fragment>
  );
}

export default Events;
