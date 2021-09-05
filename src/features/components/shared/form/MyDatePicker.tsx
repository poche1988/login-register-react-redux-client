import { useField, useFormikContext } from 'formik'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Form, Label } from 'semantic-ui-react'

interface IProps {
  name: string
  placeholder: string
  label: string
}

const MyDatePicker = ({ ...props }: IProps): JSX.Element => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(props)
  return (
    <Form.Field className="form-field" error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val)
        }}
        dateFormat="dd-MMM-yyyy"
        placeholderText={props.placeholder}
        showMonthDropdown={true}
        showYearDropdown={true}
      />
      {meta.touched && meta.error && (
        <Label className="error-label" basic color="red">
          {meta.error}
        </Label>
      )}
    </Form.Field>
  )
}

export default MyDatePicker
