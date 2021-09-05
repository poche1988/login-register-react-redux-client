import { useField, useFormikContext } from 'formik'
import { DropdownProps, Form, Label, Select } from 'semantic-ui-react'
import React from 'react'
import IKeyValueText from '../../../../models/shared/IKeyValueText'

interface IProps {
  options: IKeyValueText[]
  name: string
  label: string
  customOnChange?: (value: number) => void
  onChange: (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps,
  ) => void
  fieldToClear?: string
}

const MySelect = ({ ...props }: IProps): JSX.Element => {
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const [field, meta, helpers] = useField(props.name)
  return (
    <>
      <div className="form-field">
        <Form.Field error={meta.touched && !!meta.error} {...field}>
          <label>{props.label}</label>
          <Select
            id={props.name}
            placeholder={'Please Select One'}
            options={props.options}
            value={field.value || null}
            onChange={(e, d) => {
              helpers.setValue(d.value)
              if (props.customOnChange) props.customOnChange(d.value as number)
              if (props.fieldToClear) {
                setFieldValue(props.fieldToClear, 0)
                setFieldTouched(props.fieldToClear, false)
              }
            }}
            onBlur={() => helpers.setTouched(true)}
          />
          {meta.touched && meta.error && (
            <Label className="error-label" basic color="red">
              {meta.error}
            </Label>
          )}
        </Form.Field>
      </div>
    </>
  )
}

export default MySelect
