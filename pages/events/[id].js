import { useRouter } from "next/router";
import { getEventById } from "../../dummyData.js";
import EventSummary from "@/components/event-detail/event-summary";
import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import ErrorAlert from "@/components/ui/error-alert.js";
import Button from "../../components/ui/button";

import { Fragment } from "react";

function SpecificEventPage() {
  const router = useRouter();
  const eventData = getEventById(router.query.id);

  if (!eventData) {
    return (
      <Fragment>
        <div className="center">
          <ErrorAlert>
            <p>No event found!</p>
          </ErrorAlert>
          <Button link="/events">All events</Button>
        </div>
      </Fragment>
    );
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
