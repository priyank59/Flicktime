import "../index.css";
import "./Row.css";

import React, { useState, useEffect, Component } from "react";
import { projectFirestore } from '../firebase/config';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { Button } from "react-bootstrap";

function Ratings({movieId}) {

    const email = localStorage.getItem('email');

    const [ratings, setRatings] = useState("");

    useEffect( () => {
        
        console.log("useEffect" + movieId);

		const fetchProfile = async () => {
            const docRef = doc(projectFirestore, "userHistory", email, "Ratings", movieId);
			const docSnap = await getDoc(docRef);
			if(docSnap.exists()) {
                setRatings(docSnap.data().ratings);
			}
		};
		fetchProfile();
	}, []);

    const updateRatings = async (e) => {
        var ratingsFromUser = document.querySelector("#ratingsInput").value;
        if(ratingsFromUser) {
            ratingsFromUser = Number(ratingsFromUser);
            if(ratingsFromUser>=0 && ratingsFromUser<=5) {
                setRatings(ratingsFromUser);
                await setDoc(doc(projectFirestore, "userHistory", email+"/Ratings/"+movieId), {
                    ratings : ratingsFromUser
                });
            }
            else {
                toast.error('Enter only numeric value in range 0-5', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        } 
        else {
            toast.error('Enter some value in ratings', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

  return (
    <div className="color-dark">
        { 
            !ratings && 
            <h4>
                <b> Enter your ratings in range 0-5 here: </b>
                <input id="ratingsInput" type={'text'} className="form-control" style={{width:60}} required />
                <Button type="submit" value="Rate" style={{color:"#befaf9", backgroundColor:"#003333"}} onClick={updateRatings}> Rate </Button>
            </h4>
        }
        { 
            ratings && 
            <h4> 
                <b> Your Ratings: </b> 
                {ratings} 
            </h4>
        }
    </div>
  );
}

export default Ratings;