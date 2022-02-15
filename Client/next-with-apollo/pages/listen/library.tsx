import type { NextPage } from 'next'

import { useState } from 'react'
import styled from 'styled-components'


const Library: NextPage = () => {
  const [maximized, setMaximized] = useState(true)

  const handlerMenuClick = () => {
    setMaximized(!maximized);
  }

  return (
    <Wrapper>

    </Wrapper>
  )
}

export default Library

const Wrapper = styled.div`

`