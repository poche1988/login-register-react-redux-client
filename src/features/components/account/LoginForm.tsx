import { ErrorMessage, Form, Formik } from 'formik'
import React from 'react'
import { Button, Label } from 'semantic-ui-react'
import accountRepository from '../../../app/api/repositories/accountRepository'
import MyTextInput from '../shared/form/MyTextInput'
import IUserForm from '../../../models/users/IUserForm'
import useAccountDispatcher from '../../../stores/account/useAccountDispatcher'
import * as Yup from 'yup'

const LoginForm = (): JSX.Element => {
  const { Login } = useAccountDispatcher()

  const handleLogin = async (creds: IUserForm) => {
    try {
      await accountRepository.login(creds).then((response) => {
        Login(response)
      })
    } catch (e) {
      throw e
    }
  }

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  })

  return (
    <Formik
      initialValues={{ email: '', password: '', error: null }}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={(values, { setErrors }) =>
        handleLogin(values).catch(() => {
          setErrors({
            error:
              'The email and password you entered did not match our records.',
          })
        })
      }
    >
      {({ handleSubmit, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput label="Email" name="email" placeholder="Email" />
          <MyTextInput
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
          />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button positive content="Login" type="submit" fluid />
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
