import type { NextPage } from 'next'

import { useState } from 'react'
import styled from 'styled-components'


const Home: NextPage = () => {
  const [maximized, setMaximized] = useState(true)

  const handlerMenuClick = () => {
    setMaximized(!maximized);
  }

  return (
    <Wrapper>

    </Wrapper>
  )
}

export default Home

const Wrapper = styled.div`

`