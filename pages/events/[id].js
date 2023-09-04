import { useRouter } from "next/router";
import { getEventById } from "../../dummyData.js";
import EventSummary from "@/components/event-detail/event-summary";
import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import LogisticsItem from "@/components/event-detail/logistics-item";
import Icon from "../../components/icons/arrow-right-icon.js";

import { Fragment } from "react";

function SpecificEventPage() {
  const router = useRouter();
  const eventData = getEventById(router.query.id);

  if (!eventData) {
    return <p>no event found</p>;
  }

  return (
    <Fragment>
      <EventSummary
        id={eventData.id}
        title={eventData.title}
        location={eventData.location}
        date={eventData.date}
        image={eventData.image}
        key={eventData.id}
      />
      <EventLogistics
        date={eventData.date}
        address={eventData.location}
        image={eventData.image}
        imageAlt={eventData.title}
      />
      <EventContent>
        <p>{eventData.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default SpecificEventPage;
