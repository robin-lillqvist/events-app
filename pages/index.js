import { getFeaturedEvents } from "@/helpers/api-utils.js";
import EventList from "../components/events/event-list.js";

function Home(props) {
  return (
    <div>
      <EventList events={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  console.log(featuredEvents);

  return {
    props: { events: featuredEvents },
  };
}

export default Home;
