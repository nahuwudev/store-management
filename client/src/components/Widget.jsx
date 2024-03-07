import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import TinyChart from "./Charts/Tiny";

export default function Widget(props) {
  return (
    <Card>
      <CardHeader className="flex gap-3 justify-between">
        <h4 className="text-slate-500">{props.titleHeader}</h4>
        <p className="text-slate-500">{props.subTitleHeader}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex items-center justify-between">
          <span className="text-4xl font-medium">{props.body}</span>
          <TinyChart />
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link href={props.link} className="text-xs" showAnchorIcon>
          {props.textLink}
        </Link>
      </CardFooter>
    </Card>
  );
}
