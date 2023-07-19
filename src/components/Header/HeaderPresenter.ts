import styled from 'styled-components'

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderText = styled.h1`
  margin: 0.25rem;
`

const BackGround = styled.div`
  display: flex;
  background-color: #cae9ff;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: relative;
`

export { HeaderWrapper, HeaderText, BackGround }
