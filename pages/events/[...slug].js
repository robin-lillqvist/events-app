import { useRouter } from "next/router";
import { getFilteredEvents } from "@/helpers/api-utils";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import { Fragment } from "react";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";

function FilteredEventsPage(props) {
  const router = useRouter();
  const filterData = router.query.slug;
  const { events, dates, hasError, noEvents } = props;
  const thisDate = new Date(dates.year, dates.month - 1);

  if (!filterData) {
    return (
      <Fragment>
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  if (hasError) {
    console.log("Bad input, but no events found...");
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

  if (noEvents) {
    console.log("Good input, but no events found...");
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
      <EventList events={events} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
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
      /* notFound: true, */ props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({ year: filteredYear, month: filteredMonth });
  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      /* notFound: true, */ props: { noEvents: true },
    };
  }

  return {
    props: { events: filteredEvents, dates: { year: filteredYear, month: filteredMonth } },
  };
}

export default FilteredEventsPage;
