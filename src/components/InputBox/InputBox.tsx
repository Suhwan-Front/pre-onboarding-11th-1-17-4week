/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useContext, useEffect, useState } from 'react'
import {
  InputBoxWrapper,
  InputBoxInput,
  InputBoxButton,
  RelatedSearchesWrapper,
  RelatedListUl,
  RelatedSearchItem,
} from './InputBoxPresenter'
import { SickContext } from 'contexts/SickListContext'
import useDedounce from 'hooks/useDebounce'

const InputBox: React.FC = () => {
  const { searchSickList, fetchError, fetchSickList } = useContext(SickContext)
  const [inputBoxValue, setInputBoxValue] = useState<string>('')
  const debounceInputValue = useDedounce(inputBoxValue, 300)

  const handleInputBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setInputBoxValue(value)
  }

  useEffect(() => {
    fetchSickList(debounceInputValue)
  }, [debounceInputValue])

  return (
    <>
      <InputBoxWrapper>
        <InputBoxInput type="text" onChange={handleInputBoxChange} />
        <InputBoxButton>검색</InputBoxButton>
      </InputBoxWrapper>
      <RelatedSearchesWrapper>
        <RelatedListUl>
          {searchSickList.slice(0, 5).map((sick) => (
            <RelatedSearchItem key={sick.sickCd}>
              {sick.sickNm}
            </RelatedSearchItem>
          ))}
        </RelatedListUl>
      </RelatedSearchesWrapper>
    </>
  )
}

export default InputBox
