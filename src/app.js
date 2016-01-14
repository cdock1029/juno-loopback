import React from 'react'
import { render } from 'react-dom'

import Parse from 'parse'
import Root from './components/Root'

import { APP_ID, JS_KEY } from './config'

Parse.initialize(APP_ID, JS_KEY)

render(
  <Root />,
  document.getElementById('app')
)
