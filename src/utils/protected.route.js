import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'

const ProtectedRoute = ({ user, children, pathname, ...rest }) => {
  return (
    <>
      {console.count('Run from pro')}
      <Route
        {...rest}
        render={() => {
          if (user) {
            return children
          } else {
            // setIsModal(true)

            return (
              <Redirect
                to={{ pathname: '/', state: { modal: true, pathname } }}
              />
            )
          }
        }}
      />
    </>
  )
}

export default ProtectedRoute
