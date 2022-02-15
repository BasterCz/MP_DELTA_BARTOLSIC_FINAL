import type { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'

const Feed: NextPage = () => {
  const [maximized, setMaximized] = useState(true)

  const handlerMenuClick = () => {
    setMaximized(!maximized);
  }

  return (
    <Wrapper>
    </Wrapper>
  )
}

export default Feed

const Wrapper = styled.div`

`