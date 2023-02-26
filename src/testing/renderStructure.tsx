import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "../app/store"
import MainPage from "../pages/MainPage"

export const renderStructure = () => {
  return (
    render (
      <Provider store={store}>
        <BrowserRouter>
          <MainPage/>
        </BrowserRouter>
      </Provider>
    )
  )
}