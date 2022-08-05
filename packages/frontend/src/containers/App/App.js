import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';
import './App.css';

export const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </Router>
);
