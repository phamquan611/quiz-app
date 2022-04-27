import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Header from './components/Header/header';
import "./sass/main.css"
import Home from './pages/Home/home';
import Quiz from './pages/Quiz/Quiz';
import Result from './pages/Result/result';
function App() {
  return (
    <Router>
        <div className='App'>
          <Header/>
        </div>
        <Switch>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/quiz' exact>
            <Quiz/>
          </Route>
          <Route path='/result' exact>
            <Result/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
