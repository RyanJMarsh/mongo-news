import React from 'react'

function NavBar({setTopic}) {
  return (
    <div className="nav-bar">
      <h4>Filter by Topic:</h4>
      <button onClick={() => setTopic("all")}>All</button>
      <button onClick={() => setTopic("coding")}>Coding</button>
      <button onClick={() => setTopic("cooking")}>Cooking</button>
      <button onClick={() => setTopic("football")}>Football</button>
    </div>
  )
}

export default NavBar