/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useContext, useEffect, useState } from 'react'
import {
  InputBoxWrapper,
  InputBoxInput,
  InputBoxButton,
} from './InputBoxPresenter'
import { SickContext } from 'contexts/SickListContext'

const InputBox: React.FC = () => {
  const { searchSickList, fetchError, fetchSickList } = useContext(SickContext)
  const [inputBoxValue, setInputBoxValue] = useState<string>('')

  const handleInputBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setInputBoxValue(value)
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSickList(inputBoxValue)
    }, 300)
    return () => {
      clearTimeout(debounceTimer)
    }
  }, [inputBoxValue])

  return (
    <>
      <InputBoxWrapper>
        <InputBoxInput type="text" onChange={handleInputBoxChange} />
        <InputBoxButton>검색</InputBoxButton>
      </InputBoxWrapper>
      <div>
        {searchSickList.map((sick) => (
          <div key={sick.sickCd}>{sick.sickNm}</div>
        ))}
      </div>
    </>
  )
}

export default InputBox
