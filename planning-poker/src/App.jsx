import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Table from './components/room/home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CardRoom from './screens/cardRoom/CardRoom'

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/home">
          <div>
            <Table />
          </div>
        </Route>
        <Route exact path="/room">
          <CardRoom />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}
