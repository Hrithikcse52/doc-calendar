import "./App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import {
  useDisclosure,
  Button,
  Input,
  Select,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ItemModal from "./components/modal";

const eventsData = [
  {
    patientName: "Amit Singh 5",
    gender: "male",
    age: 22,
    problemsReported: "leg injury",
    start: "2022-09-05 05:00:01",
    end: "2022-09-05 09:00:01",
  },
  {
    patientName: "Amit Singh fir",
    gender: "male",
    age: 22,
    problemsReported: "leg injury",
    start: "2022-09-05 10:00:01",
    end: "2022-09-05 12:00:01",
  },
  {
    patientName: "Amit Singh late",
    gender: "female",
    age: 23,
    problemsReported: "leg injury",
    start: "2022-10-05 12:00:01",
    end: "2022-10-05 13:00:01",
  },
];

function getDateNum(date) {
  return new Date(date).getTime();
}

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState([]);
  const [index, setIndex] = useState(0);

  const [filterValue, setFilterValue] = useState({
    str: "",
    start: null,
    end: null,
    type: "patient",
  });
  const calender = useRef();

  useEffect(() => {
    console.log("ran", eventsData);
    eventsData.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    let fir = eventsData[0].end;
    const remv = [];
    for (let i = 1; i < eventsData.length; i++) {
      if (new Date(eventsData[i].start).getTime() <= new Date(fir).getTime()) {
        remv.push(i);
      } else {
        fir = eventsData[i].end;
      }
    }
    remv.forEach((ind) => {
      eventsData.splice(ind, 1);
    });

    setEvents(eventsData);
  }, []);

  function jumptodate(date) {
    if (calender.current) {
      const calenderApi = calender.current.getApi();
      calenderApi.gotoDate(date);
    }
  }

  function filterEvents() {
    if (filterValue.type === "date") {
      const data = events.filter((event) => {
        if (filterValue.start && !filterValue.end) {
          return getDateNum(event.start) >= getDateNum(filterValue.start);
        }
        if (!filterValue.start && filterValue.end) {
          return getDateNum(event.end) <= getDateNum(filterValue.end);
        }
        if (filterValue.start && filterValue.end) {
          return (
            getDateNum(event.start) >= getDateNum(filterValue.start) &&
            getDateNum(event.end) <= getDateNum(filterValue.end)
          );
        }
      });
      if (data.length) {
        jumptodate(data[0].start);
      }
    }
    if (filterValue.type === "gender") {
      const data = events.filter((event) => event.gender === filterValue.str);
      console.log("gender", data);
      if (data.length) jumptodate(data[0].start);
    }
    if (filterValue.type === "age") {
      const data = events.filter(
        (event) => event.age.toString() === filterValue.str
      );

      if (data.length) jumptodate(data[0].start);
    }
    if (filterValue.type === "problem") {
      const data = events.filter(
        (event) => event.problemsReported === filterValue.str
      );

      if (data.length) jumptodate(data[0].start);
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <Flex gap={2} justifyItems="center" alignItems={"center"}>
        <Flex>
          <label>
            Select Filter Type
            <Select
              onChange={(e) => {
                console.log(e.target.value);
                setFilterValue({ ...filterValue, type: e.target.value });
              }}
            >
              <option value={"date"}>Date Range</option>
              <option value={"problem"}>Problem Reported</option>
              <option value={"gender"}>Gender</option>
              <option value={"age"}>Age</option>
            </Select>
          </label>
        </Flex>
        {filterValue.type === "date" ? (
          <Flex>
            <label>
              Start Date
              <Input
                onChange={(event) => {
                  setFilterValue({ ...filterValue, start: event.target.value });
                }}
                type={"date"}
              />
            </label>
            <label>
              End Date
              <Input
                type={"date"}
                onChange={(event) => {
                  setFilterValue({ ...filterValue, end: event.target.value });
                }}
              />
            </label>
          </Flex>
        ) : (
          <Flex>
            <label>
              Search Text
              <Input
                value={filterValue.str}
                onChange={(e) => {
                  setFilterValue({ ...filterValue, str: e.target.value });
                }}
                type={"text"}
              />
            </label>
          </Flex>
        )}
      </Flex>
      <Box py="2">
        <Button onClick={filterEvents}>Search</Button>
      </Box>
      <div style={{ padding: "1rem" }} />
      {events && events.length && (
        <FullCalendar
          ref={calender}
          height={"74vh"}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView="timeGrid"
          eventOverlap={true}
          slotEventOverlap={false}
          events={events}
          initialDate={events[0].start}
          eventContent={(eve) => {
            return (
              <Flex gap={"2"} p="2" flexDirection={"column"}>
                <div>{eve.event.extendedProps.patientName}</div>
                <div>{eve.event.extendedProps.problemsReported}</div>
              </Flex>
            );
          }}
          eventClick={(event) => {
            const element = event.event.toJSON().extendedProps;
            const elementindex = events.findIndex(
              (event) =>
                event.patientName === element.patientName &&
                event.problemsReported === element.problemsReported
            );
            setIndex(elementindex);
            onOpen();
          }}
        />
      )}
      <ItemModal
        events={events}
        index={index}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
}

export default App;
