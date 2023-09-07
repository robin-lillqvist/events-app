import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getAllEvents } from "@/helpers/api-utils";
import EventsSearch from "./events-search";
import EventList from "@/components/events/event-list";

function Events(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  const headData = (
    <Head>
      <title>All events page</title>
      <meta name="description" content="All events page"></meta>
    </Head>
  );

  return (
    <Fragment>
      {headData}
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default Events;
