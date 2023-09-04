import EventItem from "./event-item";
import classes from "./event-list.module.css";

function EventList(props) {
  const { events } = props;

  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
          key={event.id}
        />
      ))}
    </ul>
  );
}

export default EventList;
