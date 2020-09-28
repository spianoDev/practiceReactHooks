import React, { useEffect, useState } from "react";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import CardContainer from "../components/CardContainer";
import Row from "../components/Row";
import LanguagesContext from '../utils/LanguagesContext'
import LanguageSwitch from '../components/LanguageSwitch'


function Gallery() {
  const [languages, setLanguages] = useState([])
  const [language, setLanguage] = useState('');

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [userIndex, setUserIndex] = useState(0);

  // When the component mounts, a call will be made to get random users.
  useEffect(() => {
    if (languages.length === 0) {
      loadLanguages()
    } else {
      loadUsers(language)
    }
  }, [language]);

  const handleLanguageChange = event => setLanguage(event.target.value)

  function loadLanguages() {
    API.getLanguagesList()
      .then(languages => {
        setLanguages(languages)
        setLanguage(languages[0])
        loadUsers(languages[0]);
      })
      .catch(err => console.log(err));
  }

  function loadUsers(language) {
    API.getUsersByLanguage(language).then(users => {
      setUsers(users);
      setUser(users[0]);
    })
    .catch(err => console.log(err));
  }

  function nextUser(userIndex) {
    // Ensure that the user index stays within our range of users
    if (userIndex >= users.length) {
      userIndex = 0;
    }
    setUserIndex(userIndex);
    setUser(users[userIndex]);
  }

  function previousUser(userIndex) {
    // Ensure that the user index stays within our range of users
    if (userIndex < 0) {
      userIndex = users.length - 1;
    }
    setUserIndex(userIndex);
    setUser(users[userIndex]);
  }

  function handleBtnClick(event) {
    // Get the title of the clicked button
    const btnName = event.target.getAttribute("data-value");
    if (btnName === "next") {
      const newUserIndex = userIndex + 1;
      nextUser(newUserIndex);
    } else {
      const newUserIndex = userIndex - 1;
      previousUser(newUserIndex);
    }
  }

  return (
    <UserContext.Provider value={{ user, users, handleBtnClick }}>
      <LanguagesContext.Provider value={{ language, languages, handleLanguageChange }}>
        <div>
          <h1 className="text-center">Welcome to LinkedUp</h1>
          <h3 className="text-center">Click on the arrows to browse users</h3>
          <Row>
            <LanguageSwitch />
            <CardContainer />
          </Row>
        </div>
      </LanguagesContext.Provider>
    </UserContext.Provider>
  );
}

export default Gallery;
