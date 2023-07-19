import React, { useContext, useState } from 'react'
import { InputBoxWrapper } from './InputBoxPresenter'
import { HealthListContext } from 'contexts/HealthListContext'
import { type HealthData } from 'types/types'
import {
  MAX_RECENT_SEARCHES,
  MAX_RELATED_SEARCHES,
} from 'components/constants/const'

const InputBox: React.FC = () => {
  const { healthList } = useContext(HealthListContext)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [relatedSearches, setRelatedSearches] = useState<HealthData[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  const handleInputBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchQuery(value)
    const filteredData = healthList.filter((sick) =>
      sick.sickNm.includes(value),
    )
    setRelatedSearches(filteredData.slice(0, MAX_RELATED_SEARCHES))
  }

  const handleInputBoxClick = () => {
    setRecentSearches((prevSearches) => [
      searchQuery,
      ...prevSearches.slice(0, MAX_RECENT_SEARCHES),
    ])
  }

  const handleInputBoxBlur = () => {
    setRecentSearches([])
    setRelatedSearches([])
  }

  return (
    <InputBoxWrapper>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputBoxChange}
        placeholder="검색어를 입력하세요"
        onClick={handleInputBoxClick}
        onBlur={handleInputBoxBlur}
      />
      <button>검색</button>
      {relatedSearches.length === 0 ? (
        <>
          <div>최근 검색어</div>
          {recentSearches.length > 0 ? (
            recentSearches.map((search, index) => <li key={index}>{search}</li>)
          ) : (
            <li>검색어 없음</li>
          )}
          <div>추천 검색어</div>
          <li>검색어 없음</li>
        </>
      ) : (
        <>
          <div>추천 검색어</div>
          {relatedSearches.map((sick) => (
            <li key={sick.sickCd}>{sick.sickNm}</li>
          ))}
        </>
      )}
    </InputBoxWrapper>
  )
}

export default InputBox
