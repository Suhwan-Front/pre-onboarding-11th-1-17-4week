import styled from 'styled-components'

const InputBoxWrapper = styled.form`
  display: flex;
  align-items: center;
  width: 80%;
  height: 2.5rem;
  font-size: 1rem;
  border: 0;
  border-radius: 0.5rem;
  outline: none;
  padding-left: 0.625rem;
  background-color: white;
  box-shadow: 0 0 0.375rem 0.0625rem gainsboro;
  margin: 1.25rem auto;
`
const InputBoxInput = styled.input`
  height: 2.25rem;
  font-size: 1rem;
  border: 0;
  border-radius: 0.5rem;
  outline: none;
  flex: 1;
  border: none;
  padding: 0 15px;
  height: 40px;
  :focus {
    border: 0.0625rem solid;
    height: 2.375rem;
  }
`

const InputBoxButton = styled.button`
  height: 1.7rem;
  width: 3rem;
  margin: 0 0.625rem;
  border: 0;
  border-radius: 0.5rem;
  outline: none;
  background: black;
  color: white;
  text-align: -webkit-center;
  text-align: -moz-center;
`

const RelatedSearchesWrapper = styled.div`
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  width: 80%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: white;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
`

const RelatedListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const RelatedListDiv = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
`

const RelatedSearchItem = styled.li`
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;

  &:hover {
    background-color: #f7f7f7;
  }
`

export {
  InputBoxWrapper,
  InputBoxInput,
  InputBoxButton,
  RelatedListDiv,
  RelatedListUl,
  RelatedSearchItem,
  RelatedSearchesWrapper,
}
