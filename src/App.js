import DisplayTables from './components/DisplayTables';
import DisplayNavbar from './components/DisplayNavbar';
// import DisplayDetails from './components/DisplayDetails';


function App() {

  return (
    <div className="App">
      <DisplayNavbar></DisplayNavbar>

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
