import React from 'react'
import InputBox from 'components/InputBox/InputBox'
import Header from 'components/Header/Header'
import { BackGround } from 'components/Header/HeaderPresenter'

const pages = () => {
  return (
    <>
      <BackGround>
        <Header />
        <InputBox />
      </BackGround>
    </>
  )
}

export default pages
