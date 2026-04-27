
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/HomePage/NavBar.jsx'
import { Homepagee } from './components/HomePage/Homepagee.jsx';
import { SignIn } from './components/SignInPage/SignIn.jsx';
import { Category } from './components/CategoriesPage/Category.jsx';
import { MyBooks } from './components/MyBooksPage/MyBooks.jsx';
import { BookDetail } from './components/BookDetailPage/BookDetail.jsx';
import { Register } from './components/SignInPage/Register.jsx';
import { Profile } from './components/ProfilePage/Profile.jsx';
import { Search } from './components/SearchPage/Search.jsx';



function App() {

  return (
    <>

      <Router>
          <NavBar />
          
           <Routes> 
              <Route path="/" element={<Homepagee />} /> 
              <Route path="/signIn" element = {< SignIn/>} />
              <Route path="/Categories" element = {< Category/>} />
              <Route path="/myBooks" element = {< MyBooks/>} />
              <Route path="/book/:id" element = {< BookDetail/>} />
              <Route path="/register" element = {< Register/>} />
              <Route path="/profile" element = {< Profile/>} />
              <Route path="/search/:query" element = {<Search />} />

           </Routes> 
      </Router>
      
      



    </>
  );
}

export default App
