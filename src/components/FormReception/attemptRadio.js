import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
// import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { Stack } from "@mui/joy";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import HandymanIcon from "@mui/icons-material/Handyman";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const typeOfWork = [
  { label: "Діагностика", value: "diagnosis", id: 1 },
  { label: "Ремонт", value: "repair", id: 2 },
  { label: "Купівля", value: "purchase", id: 3 },
];

const RadioClick = ({ changeValidation, setField }) => {
  const changeRadioClick = (newValue) => {
    if (newValue === "purchase") {
      setField("status", newValue);
      setField("finishDay", null);
      setField("finishTime", null);
      changeValidation("purchase");
    } else {
      changeValidation("normal");
      setField("action", newValue);
    }
  };

  return (
    <FormControl style={{ width: "100%" }}>
      <FormLabel id="radio-buttons-group-label">Вид операції</FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="diagnosis"
        name="radio-buttons-group"
      >
        <List
          sx={
            {
              // display: "flex",
              // flexDirection: "row",
              // justifyContent: "space-around",
            }
          }
        >
          <Stack spacing={2}>
            {typeOfWork.map((item, index) => (
              <ListItem
                variant="outlined"
                key={item.id}
                sx={{
                  boxShadow: "sm",
                  borderRadius: "8px",
                  bgcolor: "background.body",
                }}
              >
                <ListItemDecorator>
                  {
                    [
                      <TroubleshootIcon />,
                      <HandymanIcon />,
                      <AttachMoneyIcon />,
                    ][index]
                  }
                </ListItemDecorator>
                <FormControlLabel
                  // key={item.id}
                  onChange={(event, newValue) => changeRadioClick(newValue)}
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                  overlay
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
          </Stack>
        </List>
      </RadioGroup>
    </FormControl>
  );
};

export default RadioClick;
