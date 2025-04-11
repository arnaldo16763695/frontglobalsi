import React from 'react'
import HeaderSideBar from '@/app/components/HeaderSideBar'

const regiterProjectPage = () => {
  return (
    <>
      <HeaderSideBar
        title="Registro de orden"
        before="Listado de ordenes"
        href="/projects/list"
      />
    </>
  )
}

export default regiterProjectPage