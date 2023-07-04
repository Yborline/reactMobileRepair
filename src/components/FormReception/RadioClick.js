import * as React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import HandymanIcon from "@mui/icons-material/Handyman";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const typeOfWork = [
  { label: "Діагностика", value: "diagnosis", id: 1 },
  { label: "Ремонт", value: "repair", id: 2 },
  { label: "Купівля", value: "purchase", id: 3 },
];

export default function RadioClick({ changeValidation, setField }) {
  const changeRadioClick = (newValue) => {
    if (newValue.value === "purchase") {
      setField("status", newValue.value);
      setField("finishDay", null);
      setField("finishTime", null);
      changeValidation(newValue.value);
    } else {
      changeValidation(newValue.value);
      setField("status", newValue.value);
    }
  };

  return (
    <FormControl style={{ width: "100%" }}>
      <FormLabel id="radio-buttons-group-label">
        Вид операції
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          name="radio-buttons-group"
          defaultValue="diagnosis"
          onChange={(event, newValue) => changeRadioClick(event.target)}
        >
          <List
            sx={{
              minWidth: 240,
              "--List-gap": "0.5rem",
              "--ListItem-paddingY": "1rem",
              "--ListItem-radius": "8px",
              "--ListItemDecorator-size": "32px",
            }}
          >
            {typeOfWork.map((item, index) => (
              <ListItem
                variant="outlined"
                key={item.id}
                sx={{ boxShadow: "sm", bgcolor: "background.body" }}
              >
                <ListItemDecorator style={{ marginRight: "10px" }}>
                  {
                    [
                      <TroubleshootIcon />,
                      <HandymanIcon />,
                      <AttachMoneyIcon />,
                    ][index]
                  }
                </ListItemDecorator>
                <Radio
                  overlay
                  value={item.value}
                  label={item.label}
                  sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                  slotProps={{
                    action: ({ checked }) => ({
                      sx: (theme) => ({
                        ...(checked && {
                          inset: -1,
                          border: "2px solid",
                          borderColor: theme.vars.palette.primary[500],
                        }),
                      }),
                    }),
                  }}
                />
              </ListItem>
            ))}
          </List>
        </RadioGroup>
      </FormLabel>
    </FormControl>
  );
}

// <Field component={RadioGroup} name={name}>
//   <Radio
//     overlay
//     value={item}
//     label={item}
//     sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
//     slotProps={{
//       action: ({ checked }) => ({
//         sx: (theme) => ({
//           ...(checked && {
//             inset: -1,
//             border: "2px solid",
//             borderColor: theme.vars.palette.primary[500],
//           }),
//         }),
//       }),
//     }}
//   />
// </Field>
