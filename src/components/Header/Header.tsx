import React from 'react'
import { HEADERNAME } from '../constants/const'
import { HeaderWrapper } from './HeaderPresenter'

const Header = () => {
  return (
    <HeaderWrapper>
      <>{HEADERNAME}</>
    </HeaderWrapper>
  )
}

export default Header
