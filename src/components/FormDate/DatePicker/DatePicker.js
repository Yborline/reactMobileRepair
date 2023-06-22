//   import { Stack } from "@mui/joy";
//   import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//   import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//   import { TimePicker } from "@mui/x-date-pickers/TimePicker";
//   import dayjs from "dayjs";

//   const DatePicker = ({
//     handlerAutocomplate,
//     values,
//     setFieldValue,
//     errors,
//     touched,
//   }) => {
//     console.log(values);
//     return (
//       <LocalizationProvider
//         adapterLocale="uk"
//         dateAdapter={AdapterDayjs}
//       >
//         <Stack spacing={2}>
//           <div>
//             <DatePicker
//               value={values?.finishDay}
//               onChange={(event) =>
//                 handlerAutocomplate(
//                   setFieldValue,
//                   "finishDay",
//                   event,
//                   "finishTime"
//                 )
//               }
//               minDate={dayjs()}
//               label="Дата закінчення робіт"
//               sx={{ width: "100%" }}
//             />
//             {errors?.finishDay &&
//               touched?.finishDay &&
//               errors?.finishDay}
//           </div>
//           <div>
//             <TimePicker
//               disabled={values?.finishDay !== null ? false : true}
//               minutesStep={10}
//               ampm={false}
//               label="Час закінчення робіт"
//               value={values?.finishDay}
//               sx={{ width: "100%" }}
//               onChange={(event, newValue) =>
//                 setFieldValue("finishTime", event)
//               }
//             />
//             {errors?.finishTime &&
//               touched?.finishTime &&
//               errors?.finishTime}
//           </div>
//         </Stack>
//       </LocalizationProvider>
//     );
//   };

//   export default DatePicker;
