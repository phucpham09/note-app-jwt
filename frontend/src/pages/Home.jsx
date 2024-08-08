import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Note from "../components/Note.jsx";
import CreateArea from "../components/CreateArea.jsx";
import Button from "../components/Button.jsx";


const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [notes, setNotes] = useState([]);

    useEffect(() => {
      const verifyCookie = async () => {
        if (!cookies.token) {
          navigate("/login");
          return;
        }
    
        try {
          const { data } = await axios.get("http://localhost:3000/auth/protected", {
            withCredentials: true,
          });
          
          if (data && data.user) {
            const user = data.user;
            setUsername(user.username); // Use the username from the user object
            toast(`Hello ${user.username}`, { position: "top-right" });
          } else {
            // Handle case where user data is not present
            removeCookie("token");
            navigate("/login");
          }
        } catch (error) {
          console.error(error);
          removeCookie("token");
          navigate("/login");
        }
      };
    
      verifyCookie();
    }, [cookies, navigate, removeCookie]);
    

    const Logout = () => {
        removeCookie("token");
        navigate("/signup");
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/notes", {
              withCredentials: true,
            });
            
            const fetchedNotes = response.data.notes || [];
            setNotes(fetchedNotes);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, []);
      async function addNote(newNote) {
        try {
          const response = await axios.post(
            "http://localhost:3000/notes/add",
            newNote,
            { withCredentials: true }
          );
          setNotes((prevNotes) => [...prevNotes, response.data.note]);
        } catch (error) {
          console.log(error);
        }
      }


      async function deleteNote(id) {
        try {
          await axios.delete(`http://localhost:3000/notes/delete/${id}`, {
            withCredentials: true,
          });
          setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <>
      <div>
        <div className="home_page" style={{ height: '250px' }}>
          <h4 className="welcome">
            {" "}Welcome <span>{username}</span>
          </h4>
          <Button name="Log Out" Logout={Logout} />
        </div>
        <CreateArea 
        onAdd={addNote} 
        />
        {notes.map((noteItem) => (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        ))}
      </div>
      <ToastContainer />
    </>
  )
}

export default Home