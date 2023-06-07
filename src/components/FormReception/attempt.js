import { useEffect, useState } from "react";

import axios from "axios";
import Autocomplete from "@mui/joy/Autocomplete";
import { FormLabel, Stack } from "@mui/joy";
import Input from "@mui/joy/Input";
// const model = ["apple", "xiomi", "realme", "doogee"];
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const telephones = [
  { brand: "apple", id: 1 },
  { brand: "xiomi", id: 2 },
  { brand: "realme", id: 3 },
  { brand: "doogee", id: 4 },
];

const models = [
  { model: "iphone 11", id: 1 },
  { model: "iphone 12", id: 2 },
  { model: "iphone 13", id: 3 },
  { model: "iphone 14", id: 4 },
  { model: "iphone 10", id: 5 },
  { model: "iphone 9", id: 6 },
  { model: "iphone 8", id: 7 },
];

const options = {
  method: "GET",
  url: "https://mobile-phone-specs-database.p.rapidapi.com/gsm/all-brands",
  headers: {
    "X-RapidAPI-Key": "90b68a8498msh304d93f57b32844p18154ajsn6dcf6a62668b",
    "X-RapidAPI-Host": "mobile-phone-specs-database.p.rapidapi.com",
  },
};

const FormReception = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [cach, setCash] = useState("");
  const [date, setDate] = useState(null);

  const handleChange = (value, event) => {
    if (value.brand) {
      setBrand(value.brand);
    } else {
      setModel(value.model);
    }
  };

  console.log(brand);
  console.log(model);
  console.log(cach);
  console.log(date);
  return (
    <form>
      <h2>form</h2>
      {/* <FormLabel>Бренд</FormLabel> */}
      <Stack spacing={2}>
        <Autocomplete
          placeholder="Бренд"
          sx={{ width: 300 }}
          options={telephones}
          onChange={(event, newValue) => handleChange(newValue, event)}
          getOptionLabel={(option) => option.brand}
        />
        {/* <FormLabel>Модель</FormLabel> */}
        <Autocomplete
          placeholder="Модель"
          sx={{ width: 300 }}
          disabled={brand !== "" ? false : true}
          options={models}
          onChange={(event, newValue) => handleChange(newValue)}
          getOptionLabel={(option) => option.model}
        />

        <Input
          type="text"
          // onChange={(event) => setCash(event.target.value)}
          placeholder="Ім'я клієнта "
          sx={{ width: 300 }}
        />
        <Input
          type="number"
          // onChange={(event) => setCash(event.target.value)}
          placeholder="Номер телефону"
          sx={{ width: 300 }}
        />
        <Input
          type="number"
          onChange={(event) => setCash(event.target.value)}
          placeholder="Ціна"
          sx={{ width: 300 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={date}
              onChange={(newValue) => setDate(newValue)}
              label="Basic date picker"
            />
          </DemoContainer>
        </LocalizationProvider>
      </Stack>
    </form>
  );
};

export default FormReception;
