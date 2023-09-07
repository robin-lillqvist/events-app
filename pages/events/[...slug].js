import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

import { getFilteredEvents } from "@/helpers/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {
  const router = useRouter();
  const urlData = router.query.slug;
  const [loadedEvents, setLoadedEvents] = useState();

  const { data, error } = useSWR(
    "https://nextjs-events-database-75dd8-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return (
      <Fragment>
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const numYear = +urlData[0];
  const numMonth = +urlData[1];
  const thisDate = new Date(numYear, numMonth - 1);

  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
    return (
      <Fragment>
        <div className="center">
          <ErrorAlert>
            <p>Invalid filter, Please adjust values</p>
          </ErrorAlert>
          <Button link="/events">All events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <div className="center">
          <ErrorAlert>
            <p>No events founds</p>
          </ErrorAlert>
          <Button link="/events">All events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResultsTitle date={thisDate} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

/* export async function getServerSideProps(context) {
  const { params } = context;
  const filteredYear = +params.slug[0];
  const filteredMonth = +params.slug[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      // notFound: true,
      props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({ year: filteredYear, month: filteredMonth });
  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      // notFound: true,  
      props: { noEvents: true },
    };
  }

  return {
    props: { events: filteredEvents, dates: { year: filteredYear, month: filteredMonth } },
  };
} */

export default FilteredEventsPage;
