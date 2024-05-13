import Link from "next/link";

import cssList from "./event-list.module.css";
import cssItem from "./event-item.module.css";
import Button from "../UI/button";

export function EventList(props) {
  const { item } = props;
  return (
    <ul className={cssList.list}>
      {item.map((event) =>
        EventItem({
          img: event.image,
          title: event.title,
          date: event.date,
          address: event.location,
          id: event.id,
        })
      )}
    </ul>
  );
}

function EventItem(props) {
  console.log(props);
  const { img, title, date, address, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fotmattedAddress = address.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <li key={id} className={cssItem.item}>
      <img src={"/" + img} alt={title} width="250" height="160" />
      <div className={cssItem.content}>
        <div className={cssItem.summary}>
          <h2>{title}</h2>
          <div className={cssItem.date}>
            <time>{humanReadableDate}</time>
          </div>
          <div className={cssItem.address}>
            <address>{fotmattedAddress}</address>
          </div>
        </div>

        <div className={cssItem.actions}>
          <Button href={exploreLink}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
}
