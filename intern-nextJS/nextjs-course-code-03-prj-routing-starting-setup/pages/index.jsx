import { EventList } from "../components/events/eventList";
import { getFeaturedEvents } from "../dummy-data";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <>
      <div>
        <EventList item={featuredEvents} />
      </div>
    </>
  );
}
