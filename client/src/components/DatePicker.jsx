import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import { useFormikContext } from "formik";

const DatePickerField = props => {
  const { setFieldValue } = useFormikContext();
  const { value, name } = props;
 

  return (
    <DatePicker
    dateFormat="yyyy-MM-dd"
      // selected={(value && new Date(value)) || null}
      selected={(moment(value).format("DD-MM-YYYY") && new Date(value)) || null}
      onChange={val => {
        console.log(val);
        // return props.onChange(name)(val)
        return setFieldValue(name, val);
      }}
    />
  );
};

export default DatePickerField;


