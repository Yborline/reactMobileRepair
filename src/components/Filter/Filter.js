import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { phonesSlice } from "../../redux/telephones/phones-reducer";
import { getFilter } from "../../redux/telephones/phones-selector";
import { useLocation } from "react-router-dom";
import Input from "@mui/joy/Input";
import { Label, Div } from "./Filter.styled";

export default function Filter({ width, marginRight, marginBottom }) {
  const valueFilter = useSelector(getFilter);
  const dispatch = useDispatch();
  const { changeFilter } = phonesSlice.actions;
  let location = useLocation();
  useEffect(() => {
    dispatch(changeFilter(""));
  }, [changeFilter, dispatch, location]);

  return (
    <Div marginRight={marginRight} marginBottom={marginBottom}>
      <Label width={width}>
        <Input
          placeholder="Фільтр"
          type="text"
          value={valueFilter}
          onChange={(e) => dispatch(changeFilter(e.target.value))}
        />
      </Label>
    </Div>
  );
}
