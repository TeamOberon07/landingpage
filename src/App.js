import './App.css';
import { ECommerce } from './components/ECommerce';
import {LandingPage} from './components/LandingPage';

function App() {
  return (
    <div id='content'>
      <h1>Sezione E-commerce</h1>
      <ECommerce />
      <h1>Sezione Landing Page</h1>
      <LandingPage />
    </div>
   
  );
}

export default App;
