import { useRouter } from "next/router";
import { getFilteredEvents } from "@/dummyData";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import { Fragment } from "react";
import ErrorAlert from "@/components/ui/error-alert";

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter, Please adjust values</p>
        </ErrorAlert>
        <Button link="/events">All events</Button>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({ year: filteredYear, month: filteredMonth });
  console.log(filteredEvents);

  if (!filteredEvents || filteredEvents.length < 1) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events founds</p>
        </ErrorAlert>
        <Button link="/events">All events</Button>
      </Fragment>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
