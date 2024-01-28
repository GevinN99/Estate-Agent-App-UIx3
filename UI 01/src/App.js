import './App.css';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./Pages/HomePage";

function App() {
  return (
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />}/>
          </Routes>
        </BrowserRouter>
      </DndProvider>
  );
}

export default App;
