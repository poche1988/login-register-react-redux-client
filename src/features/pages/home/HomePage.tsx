import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { RootState } from '../../../stores/index'
import useAuthentication from '../../../customHooks/account/useAuthentication'
import ReactModal from 'react-modal'
import LoginForm from '../../components/account/LoginForm'
import RegisterForm from '../../components/account/RegisterForm'
import './homePage.css'

ReactModal.setAppElement('#root')

const HomePage = (props: RouteComponentProps): JSX.Element => {
  const user = useSelector((state: RootState) => state.account.loggedInUser)
  const { isAuthenticated } = useAuthentication()
  const [showModal, setShowModal] = useState(false)
  const [modalContentIsLogin, setModalContentIsLogin] = useState(false)

  const handleOpenModal = (isLogin: boolean): void => {
    setModalContentIsLogin(isLogin)
    setShowModal(true)
  }

  const handleCloseModal = (): void => {
    setShowModal(false)
  }

  return (
    <Container>
      {isAuthenticated() ? (
        <>
          <h1>Hello {user?.displayName}</h1>
          <p>
            Go to <Link to="/Pets">Pets</Link>
          </p>
        </>
      ) : (
        <div>
          <button onClick={() => handleOpenModal(true)}>Login</button>
          <button onClick={() => handleOpenModal(false)}>Register</button>
          <ReactModal
            isOpen={showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={handleCloseModal}
            className="modal"
            overlayClassName="modal-verlay"
          >
            {modalContentIsLogin ? (
              <>
                <LoginForm {...props} />
                <a onClick={() => handleOpenModal(false)}>Or Sign Up</a>
              </>
            ) : (
              <>
                <RegisterForm {...props} />
                <a onClick={() => handleOpenModal(true)}>Or Log in</a>
              </>
            )}
            <button className="close-modal" onClick={handleCloseModal}>
              x
            </button>
          </ReactModal>
        </div>
      )}
    </Container>
  )
}

export default HomePage
