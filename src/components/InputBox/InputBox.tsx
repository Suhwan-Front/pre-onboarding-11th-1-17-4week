/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext, useState, useEffect } from 'react'
import {
  InputBoxWrapper,
  InputBoxInput,
  InputBoxButton,
  RelatedListDiv,
  RelatedListUl,
  RelatedSearchItem,
  RelatedSearchesWrapper,
} from './InputBoxPresenter'
import { HealthListContext } from 'contexts/HealthListContext'
import { type HealthData } from 'types/types'
import {
  MAX_RECENT_SEARCHES,
  MAX_RELATED_SEARCHES,
} from 'components/constants/const'

const InputBox: React.FC = () => {
  const { healthList, setSearchQuery, updateHealthList } =
    useContext(HealthListContext)
  const [searchQuery, setSearchQueryLocal] = useState<string>('')
  const [relatedSearches, setRelatedSearches] = useState<HealthData[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isInputFocused, setInputFocused] = useState<boolean>(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  )

  useEffect(() => {
    setRelatedSearches(healthList.slice(0, MAX_RELATED_SEARCHES))
  }, [healthList])

  useEffect(() => {
    if (typingTimeout != null) {
      clearTimeout(typingTimeout)
    }

    const newTypingTimeout = setTimeout(() => {
      setSearchQueryLocal(searchQuery)

      // 로컬 스토리지에서 캐싱된 데이터를 가져옴
      const cachedDataJSON = localStorage.getItem('cachedData')
      if (cachedDataJSON) {
        const parsedData = JSON.parse(cachedDataJSON)
        const cachedSearchQueries = parsedData.searchQueries
        const cachedData = parsedData.data

        if (cachedSearchQueries.includes(searchQuery)) {
          setSearchQuery(searchQuery)
          updateHealthList(cachedData[searchQuery])
        } else {
          setSearchQuery(searchQuery)
        }
      } else {
        setSearchQuery(searchQuery)
      }
    }, 500)

    setTypingTimeout(newTypingTimeout)
  }, [searchQuery, setSearchQuery, updateHealthList])

  const handleInputBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchQueryLocal(value)
  }

  const handleInputBoxClick = () => {
    setInputFocused(true)
  }

  const handleInputBoxBlur = () => {
    setInputFocused(false)
  }

  const handleApiButtonClick = () => {
    setRecentSearches((prevSearches) => [
      searchQuery,
      ...prevSearches.slice(0, MAX_RECENT_SEARCHES),
    ])
    if (searchQuery === '') {
      window.location.href = `https://clinicaltrialskorea.com/studies?conditions=${searchQuery}`
    }
    setSearchQueryLocal('')
  }

  const renderRecentSearches = () => {
    if (!isInputFocused || recentSearches.length === 0) {
      return null
    }

    return (
      <RelatedSearchesWrapper>
        <RelatedListDiv>최근 검색어</RelatedListDiv>
        <RelatedListUl>
          {recentSearches.map((search, index) => (
            <RelatedSearchItem key={index}>{search}</RelatedSearchItem>
          ))}
        </RelatedListUl>
      </RelatedSearchesWrapper>
    )
  }

  const renderRelatedSearches = () => {
    if (!isInputFocused) {
      return null
    }

    if (healthList.length === 0) {
      return (
        <RelatedSearchesWrapper>
          <RelatedListDiv>검색어 없음</RelatedListDiv>
        </RelatedSearchesWrapper>
      )
    }

    return (
      <RelatedSearchesWrapper>
        <RelatedListDiv>추천 검색어</RelatedListDiv>
        <RelatedListUl>
          {relatedSearches.map((sick) => (
            <RelatedSearchItem key={sick.sickCd}>
              {sick.sickNm}
            </RelatedSearchItem>
          ))}
        </RelatedListUl>
      </RelatedSearchesWrapper>
    )
  }

  return (
    <>
      <InputBoxWrapper>
        <InputBoxInput
          type="text"
          value={searchQuery}
          onChange={handleInputBoxChange}
          placeholder="검색어를 입력하세요"
          onClick={handleInputBoxClick}
          onBlur={handleInputBoxBlur}
          onFocus={() => {
            setInputFocused(true)
          }}
        />
        <InputBoxButton onClick={handleApiButtonClick}>검색</InputBoxButton>
      </InputBoxWrapper>
      {renderRecentSearches()}
      {renderRelatedSearches()}
    </>
  )
}

export default InputBox
