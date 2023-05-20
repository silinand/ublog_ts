import React, { ReactElement } from 'react'
import logo from '../resources/logo.png'

export default function Loader(props: { loaded: boolean, children: React.ReactNode }): ReactElement | null {
  if (props.loaded)
    return <div>{props.children}</div>

  return <div>
    <img src={logo} className="App-logo" alt="logo" />
    <p>loading...</p>
  </div>
}