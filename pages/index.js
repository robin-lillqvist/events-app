import Head from "next/head";
import { getFeaturedEvents } from "@/helpers/api-utils.js";
import EventList from "../components/events/event-list.js";

function Home(props) {
  return (
    <div>
      <Head>
        <title>This is a NextJS Head</title>
        <meta name="description" content="This is a meta tag with all kinds of interesting information"></meta>
      </Head>
      <EventList events={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { events: featuredEvents },
    revalidate: 1800,
  };
}

export default Home;
