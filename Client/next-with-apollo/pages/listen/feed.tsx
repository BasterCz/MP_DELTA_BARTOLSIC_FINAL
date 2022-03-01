import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'

const Feed: NextPage = () => {
  const [maximized, setMaximized] = useState(true)

  const handlerMenuClick = () => {
    setMaximized(!maximized);
  }

  return (
    <Wrapper>
      <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Test.svg/620px-Test.svg.png" width={500} height={500}></Image>
    </Wrapper>
  )
}

export default Feed

const Wrapper = styled.div`

`