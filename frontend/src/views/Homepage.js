import React from 'react'
import useAxios from "../utils/useAxios"
import jwtDecode from 'jwt-decode'

function Homepage() {

  const api = useAxios();
  const token = localStorage.getItem("authTokens")

  if (token){
  const decode = jwtDecode(token)
  var username = decode.username
  }
    
 
  return (
    <div>
      <>
  <main role="madin" style={{ marginTop: 50 }}>
    {/* Main jumbotron for a primary marketing message or call to action */}
    <div className="jumbotron">
      <div className="container">
        <h1 className="display-3">Hello, { username}</h1>
        <p>
          
        </p>
        
      </div>
    </div>
    <div className="container">
      {/* Example row of columns */}
      <div className="row">
        <div className="col-md-4">
          <h2>Tasks</h2>
          <p>
            
          </p>
          <p>
            <a className="btn btn-secondary" href="http://localhost:3000/Task" role="button">
              View Tasks »
            </a>
          </p>
        </div>
        <div className="col-md-4">
          <h2>Chats</h2>
          <p>
            
          </p>
          <p>
            <a className="btn btn-secondary" href="http://localhost:3000/inbox" role="button">
              Messages »
            </a>
          </p>
        </div>
        <div className="col-md-4">
          <h2>Schedule</h2>
          <p>
            
          </p>
          <p>
            <a className="btn btn-secondary" href="http://localhost:3000/dashboard" role="button">
              Calendar »
            </a>
          </p>
        </div>
      </div>
      <hr />
    </div>{" "}
    {/* /container */}
  </main>
  <footer className="container">
    <p>© Company 2017-2018</p>
  </footer>
</>

    </div>
  )
}

export default Homepage