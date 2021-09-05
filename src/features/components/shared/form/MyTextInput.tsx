import { useField } from 'formik'
import React from 'react'
import { Form, Label } from 'semantic-ui-react'

interface IProps {
  placeholder: string
  name: string
  label: string
  type?: string
}

const MyTextInput = (props: IProps): JSX.Element => {
  const [field, meta] = useField(props.name)

  return (
    <Form.Field className="form-field" error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error && (
        <Label className="error-label" basic color="red">
          {meta.error}
        </Label>
      )}
    </Form.Field>
  )
}

export default MyTextInput
