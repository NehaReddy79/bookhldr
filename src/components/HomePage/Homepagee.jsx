import { Hero } from "./Hero";
import { TopPicks } from "./TopPicks";
import { ContinueRead } from "./ContinueRead";
import {useState, useEffect} from "react";

export function Homepagee(){

    const [books,setBooks] = useState([]);
    const [continueBooks, setContinueBooks] = useState([]);

    useEffect(() =>{
        fetch("https://bookhldr-production.up.railway.app/books")
        .then(res =>res.json())
        .then(data =>{
            setBooks(data);
        })
        .catch(err => console.log(err));


        const token = localStorage.getItem('token');
        if (token) {
            fetch("https://bookhldr-production.up.railway.app/myBooks", {
                headers: { authorization: token }
            })
                .then(res => res.json())
                .then(data => {
                    const reading = data
                        .filter(item => item.bookId !== null && item.status === 'reading')
                        .map(item => item.bookId);
                    setContinueBooks(reading);
                })
                .catch(err => console.log(err));
        }
    }, []);
    return (
        <>
            
            <Hero />
            <TopPicks books = { books } />
            <ContinueRead books = {continueBooks}/>
        </>
    );
}
