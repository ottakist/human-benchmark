import React, { type ReactElement, useContext, useState } from 'react'

export interface GlobalType {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}
const AppContext = React.createContext<GlobalType>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {}
})

interface ChildrenType {
  children?: ReactElement
}
const AppProvider = ({ children }: ChildrenType): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <AppContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider }
