import './App.css'
import { Provider } from 'react-redux'
import { store } from './redux'
import MoviesList from './components/MoviesList'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <h1 className=' mt-6 text-center font-bold text-4xl'>Movies</h1>
        <MoviesList/>
      </div>
    </Provider>
  )
}

export default App
