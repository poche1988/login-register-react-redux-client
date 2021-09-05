import { ErrorMessage, Form, Formik } from 'formik'
import React from 'react'
import { Button, Label } from 'semantic-ui-react'
import accountRepository from '../../../app/api/repositories/accountRepository'
import MyTextInput from '../shared/form/MyTextInput'
import IUserForm from '../../../models/users/IUserForm'
import { RouteComponentProps } from 'react-router'
import useAccountDispatcher from '../../../stores/account/useAccountDispatcher'
import * as Yup from 'yup'

const RegisterForm = (props: RouteComponentProps): JSX.Element => {
  const { Login } = useAccountDispatcher(props)

  const handleRegister = async (creds: IUserForm) => {
    try {
      await accountRepository.register(creds).then((response) => {
        Login(response)
      })
    } catch (e) {
      throw e
    }
  }

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    displayName: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string()
      .required('Required')
      .matches(
        /^.*(?=.{4,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 4 and 8 characters, at least one lower case letter, one upper case letter and one number',
      ),
    email: Yup.string().email('Invalid email').required('Required'),
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        displayName: '',
        username: '',
        error: null,
      }}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={(values, { setErrors }) =>
        handleRegister(values).catch((e) => {
          const errorMsg = e.response.data
          if (errorMsg === 'Email taken')
            setErrors({
              email: 'This Email already exist. Login to your account.',
            })
          else if (errorMsg === 'Username taken') {
            setErrors({
              username:
                'This Username already exist. Please choose a different one.',
            })
          } else {
            setErrors({
              error:
                'Sorry. Something went wrong. Your account was not created.',
            })
          }
        })
      }
    >
      {({ handleSubmit, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput
            label="Full Name"
            name="displayName"
            placeholder="Full Name"
          />
          <MyTextInput
            label="Username"
            name="username"
            placeholder="username"
          />
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
          <Button positive content="Register" type="submit" fluid />
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
