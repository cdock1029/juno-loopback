import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

export default ({active, path, text}) => (
  <Link
    className={cx({item: true, active})}
    to={path}>
    {text}
  </Link>
)
