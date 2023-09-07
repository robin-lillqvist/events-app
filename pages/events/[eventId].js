import { getEventById, getFeaturedEvents } from "@/helpers/api-utils.js";
import EventSummary from "@/components/event-detail/event-summary";
import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";

import { Fragment } from "react";

function SpecificEventPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const selectedEvent = await getEventById(eventId);

  if (!selectedEvent) {
    return { notFound: true };
  }

  return {
    props: {
      selectedEvent: selectedEvent,
    },
    revalidate: 30,
    notFound: Boolean(!selectedEvent ? true : false),
  };
}

export default SpecificEventPage;
