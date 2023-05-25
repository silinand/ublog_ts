import NoPage from './NoPage'
import logo from '../resources/logo.png'

export default function Loader(props: { loaded: boolean, children: React.ReactNode, message?: string }) {
  if (props.message != undefined) {
    return <NoPage message={props.message} />
  }

  if (props.loaded)
    return <div>{props.children}</div>

  return <div>
    <img src={logo} className="App-logo" alt="logo" />
    <p>loading...</p>
  </div>
}