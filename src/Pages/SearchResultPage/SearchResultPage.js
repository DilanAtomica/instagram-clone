import React, {useEffect, useState, useContext} from 'react';
import "./SearchResultPage.css";
import {useNavigate, useParams} from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {AppContext} from "../../App";
import SearchResultProfile from "../../Components/SearchResultPage/SearchResultProfile";

function SearchResultPage(props) {

    const navigate = useNavigate();

    const {userInfo, activateLoader, deActiveLoader} = useContext(AppContext);
    let { search } = useParams();
    const [searchedUsers, setSearchedUsers] = useState(null);

    useEffect(() => {
        if(userInfo === null) return;
        activateLoader();
        getSearchedUsers();
        console.log("STOP!");
    }, [userInfo]);

    const getSearchedUsers = async() => {
        const usersCollection = collection(db, "users");
        const usersData = await getDocs(usersCollection);
        const usersResult = usersData.docs.map((doc) => ({...doc.data(), id: doc.id}));

        let matchingUsers = [];
        for(let i = 0; i < usersResult.length; i++) {
            if(usersResult[i].username !== userInfo.username) {
                if(usersResult[i].username.includes(search)) matchingUsers.push(usersResult[i]);
            }
        }

        deActiveLoader();
        setSearchedUsers(matchingUsers);
    };

    const visitProfilePage = (userID) => {
        navigate("/profile/" + userID);
    }

    return (
        <div className="searchResultPage">
            <div className="searchResultContainer">
                {searchedUsers?.map(user => (
                    <SearchResultProfile key={user?.id} visitProfilePage={visitProfilePage} username={user?.username} avatar={user?.avatar} userID={user?.id} />
                ))}
            </div>
        </div>
    );
}

export default SearchResultPage;