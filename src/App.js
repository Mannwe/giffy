import React  from 'react'
import { Link, Route } from 'wouter'
import Home from './pages/Home'
import Detail from './pages/Detail'
import SearchResults from './pages/SearchResults'
import StaticContext from './context/StaticContext'
import { GifsContextProvider } from './context/GifsContext'

import './App.css'

function App() {
    return (
        <StaticContext.Provider value={{
            name: 'midudev',
            subscribeteAlCanal: true
        }}>
            <div className='App'>
                <section className='App-content'>
                    <Link to="/">
                        <h1 className="App-logo">
                            {/*<img className="App-logo" alt='Giffy logo' src='/logo.svg' />*/}
                            GIFFY        
                        </h1>
                    </Link>
                    <GifsContextProvider>
                        <Route
                            component={Home}
                            path="/"
                        />
                        <Route
                            component={SearchResults}
                            path="/search/:keyword"  />
                        <Route
                            component={Detail} 
                            path='/gif/:id'
                        />
                    </GifsContextProvider>
                </section>
            </div>
        </StaticContext.Provider>
    )
}

export default App
