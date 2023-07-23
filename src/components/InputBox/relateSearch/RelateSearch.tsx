import React from 'react'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { type RootState } from 'types/types'
import {
  RelatedSearchesWrapper,
  RelatedListUl,
  RelatedSearchItem,
} from '../InputBoxPresenter'

const RelateSearch: React.FC = () => {
  const searchSickList = useSelector((state: RootState) => state.searchSickList)
  return (
    <RelatedSearchesWrapper>
      <RelatedListUl>
        {searchSickList.map((sick) => (
          <RelatedSearchItem key={sick.sickCd}>{sick.sickNm}</RelatedSearchItem>
        ))}
      </RelatedListUl>
    </RelatedSearchesWrapper>
  )
}

export default RelateSearch
