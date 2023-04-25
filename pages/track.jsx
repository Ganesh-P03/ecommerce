// import { useRouter } from "next/router";

// import * as React from "react";
// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";

// const Track = () => {
//   const router = useRouter();

//   //   const [order, setOrder] = useState({});

//   //   const getOrder = useCallback(async () => {
//   //     try {
//   //       const response = await axios.get(`/api/orders/?id=${router.query.id}`);
//   //       console.log(response.data);
//   //     } catch (err) {
//   //       console.log(err);
//   //     }
//   //   }, [router.query.id]);

//   //   useEffect(() => {
//   //     getOrder(router.query.id);
//   //   }, [getOrder, router.query.id]);

//   {
//     /*
//         Make a timeline of the order
//         1. Order placed
//         2. Order confirmed
//         3. Order shipped
//         4. Order delivered

//         and mark order shipped

//         use mui timeline
//     */
//   }

//   return (
//     <Timeline position="alternate">
//       <TimelineItem>
//         <TimelineSeparator>
//           <TimelineDot />
//           <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent>Eat</TimelineContent>
//       </TimelineItem>
//       <TimelineItem>
//         <TimelineSeparator>
//           <TimelineDot />
//           <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent>Code</TimelineContent>
//       </TimelineItem>
//       <TimelineItem>
//         <TimelineSeparator>
//           <TimelineDot />
//           <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent>Sleep</TimelineContent>
//       </TimelineItem>
//       <TimelineItem>
//         <TimelineSeparator>
//           <TimelineDot />
//         </TimelineSeparator>
//         <TimelineContent>Repeat</TimelineContent>
//       </TimelineItem>
//     </Timeline>
//   );
// };

// export default Track;
