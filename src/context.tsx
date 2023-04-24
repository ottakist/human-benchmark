import React, { type ReactElement, useContext, useState } from 'react'

export interface GlobalType {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  activePage: string
  setActivePage: (t: string) => void
}
const AppContext = React.createContext<GlobalType>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  activePage: ' ',
  setActivePage: () => {}
})

interface ChildrenType {
  children?: ReactElement
}
const AppProvider = ({ children }: ChildrenType): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activePage, setActivePage] = useState('human benchmark')
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <AppContext.Provider
      value={{ isModalOpen, openModal, closeModal, activePage, setActivePage }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider }
