import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { phonesSlice } from "../../redux/telephones/phones-reducer";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import { useEffect, useState } from "react";

const FilterDate = () => {
  const { changeFilterDate } = phonesSlice.actions;
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    console.log(value);
    if (value === null) {
      dispatch(changeFilterDate(""));
      return;
    }
    const { $M: month, $y: year } = value;
    if (month || month === 0) {
      const newMounth = month.toString().length === 1 ? `0${month + 1}` : month;

      dispatch(changeFilterDate(`${newMounth}.${year}`));
    } else {
      const mouthNow = value.getMonth() + 1;

      const normalMouth =
        mouthNow.toString().length === 1 ? `0${mouthNow}` : mouthNow;

      dispatch(changeFilterDate(`${normalMouth}.${value.getFullYear()}`));
    }
  }, [changeFilterDate, dispatch, value]);

  return (
    <LocalizationProvider adapterLocale="uk" dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={'"Місяць" і "рік"'}
          views={["month", "year"]}
          minDate={dayjs(new Date("2023"))}
          onChange={(e) => setValue(e)}
          value={dayjs(value)}
          slotProps={{ textField: { size: "small" } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default FilterDate;
