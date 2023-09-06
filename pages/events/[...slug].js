import { useRouter } from "next/router";
import { getFilteredEvents } from "@/dummyData";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import { Fragment } from "react";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;
  console.log(filterData);

  if (!filterData) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">Loading...</p>
        </ErrorAlert>
        <Button link="/events">All events</Button>
      </Fragment>
    );
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
    console.log("Inside slug page...");

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

  const filteredEvents = getFilteredEvents({ year: filteredYear, month: filteredMonth });

  if (!filteredEvents || filteredEvents.length < 1) {
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

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
