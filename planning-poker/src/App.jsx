import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Table from './components/Table/Table'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CardRoom from './screens/Home/CardRoom/CardRoom'

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
