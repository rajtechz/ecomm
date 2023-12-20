import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import Main from './component/Main';
const theme = createTheme();
function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
