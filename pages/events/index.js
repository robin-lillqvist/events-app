import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getAllEvents } from "@/helpers/api-utils";
import EventsSearch from "./events-search";
import EventList from "@/components/events/event-list";

function Events(props) {
  const router = useRouter();
  const { events } = props;

  console.log(events);

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All my events</title>
      </Head>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
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
