import Image from "next/image";

import classes from "./event-item.module.css";
import Button from "../ui/button";
import AdressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

function EventItem(props) {
  const { title, image, date, location, id } = props;

  const redableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAdress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <>
      <li className={classes.item}>
        <Image src={"/" + image} alt={title} width="250" height="160" />
        <div className={classes.content}>
          <div className={classes.summary}>
            <h2 className="center">{title}</h2>
            <div className={classes.date}>
              <DateIcon />
              <time>{redableDate}</time>
            </div>
            <div className={classes.address}>
              <AdressIcon />
              <address>{formattedAdress}</address>
            </div>
          </div>
          <div className={classes.actions}>
            <Button link={exploreLink}>
              <span>Explore Event</span>
              <span className={classes.icon}>
                <ArrowRightIcon />
              </span>
            </Button>
          </div>
        </div>
      </li>
    </>
  );
}

export default EventItem;
