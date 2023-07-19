import React, { useContext, useState } from 'react'
import { InputBoxWrapper } from './InputBoxPresenter'
import { HealthListContext } from 'contexts/HealthListContext'
import { type HealthData } from 'types/types'

const InputBox: React.FC = () => {
  const { healthList } = useContext(HealthListContext)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [relatedSearches, setRelatedSearched] = useState<HealthData[]>([])

  const handleInputBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchQuery(value)
    const filteredData = healthList.filter((sick) =>
      sick.sickNm.includes(value),
    )
    setRelatedSearched(filteredData)
  }

  return (
    <InputBoxWrapper>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputBoxChange}
        placeholder="검색어를 입력하세요"
      />
      <button>검색</button>
      {relatedSearches.length > 0 && (
        <ul>
          {relatedSearches.map((sick) => (
            <li key={sick.sickCd}>{sick.sickNm}</li>
          ))}
        </ul>
      )}
    </InputBoxWrapper>
  )
}

export default InputBox
