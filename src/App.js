import DisplayTables from './components/DisplayTables';
import firebase from 'firebase/compat/app';
import { db, analytics } from './database/firebase'

import { uid } from "uid";

function App() {

  return (
    <div className="App">

      {/* Title */}
      <div className="container align-top text-center">
        <h1>Restaurant management app</h1>
      </div>


      {/* Content */}
      <DisplayTables />
      
    </div>
  );
}

export default App;
