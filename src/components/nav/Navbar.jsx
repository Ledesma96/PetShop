import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import NavBarMobile from './components/NavBarMobile.jsx';
import NavBarDesktop from './components/NavBarDesktop.jsx';

const socket = io(import.meta.env.VITE_BACKEND_URL)

const Navbar = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState([]);

    

    useEffect(() => {
        socket.on("search", (data) => {
            setSearch(data)
        })
    }, [])

    const SearchChange = (e) => {
        const inputText = e.target.value;
        if(inputText.length == 0) {
            socket.emit("text", "");
        } else {
            socket.emit("text", inputText);
        }

        setSearchText(inputText);
    }
    

    
    const enterCategory = () => {
        setOpen(false)
    }

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      
  return (
    <>
    {windowWidth < 768 ? 
        <NavBarMobile   open={open}
                        setOpen={setOpen}
                        enterCategory={enterCategory}
                        search={search}
                        setSearch={setSearch}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        SearchChange={SearchChange}></NavBarMobile>
        :
    <NavBarDesktop  enterCategory={enterCategory}
                    search={search}
                    setSearch={setSearch}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    SearchChange={SearchChange}></NavBarDesktop>}
    </>
  )
}

export default Navbar