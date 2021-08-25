import React, { useState, useEffect } from 'react';
import './Navbar.css'
import { ReactComponent as Logo } from '../../images/justify.svg';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ApprovedReviewList from '../AdminAccess/ApprovedReviewList'
import RejectedReviewList from '../AdminAccess/RejectedReviewList'
import ReportedReviewList from '../AdminAccess/ReportedReviewList'
import ApprovedApplicantList from '../AdminAccess/ApprovedApplicantList'
import RejectedApplicantList from '../AdminAccess/BlockedApplicantList'
import AllJobsList from '../UserAccess/AllJobsList'
import AllBookmarkJobList from '../UserAccess/AllBookmarkJobList'
import AllViewedJobsList from '../UserAccess/AllViewedJobsList'
import JobCategoryList from '../UserAccess/JobCategoryList'
import JobListPerCategory from '../UserAccess/JobListPerCategory'
import ReviewListJobCompanyCategory from '../UserAccess/ReviewListJobCompanyCategory'
import logoUrl from '../../images/hand-holding-heart-solid.svg';
import JobDetail from '../UserAccess/JobDetail';
import UserList from '../AdminAccess/UserList'
import CreateUser from '../CreateUser'
import authservice from '../../_helpersvc/authservice';
import EditUser from '../EditUser';
import Login from '../Login';
import Home from '../Home/Home';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Avatar from '@material-ui/core/Avatar';


export default function Navbar() {

  <img src={logoUrl} alt="Tesla" />
  //declare state. false to full menu(screen less 500px)
  const [toggleMenu, setToggleMenu] = useState(false)
  const image = localStorage.getItem("image")
  const [cimage, setImage] = useState(null)
  const role = localStorage.getItem('roles')
  
  //const user = JSON.parse(localStorage.getItem('user'))
  const [cuser, setUser] = useState(null)
  const [crole, setRole] = useState(null)

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  //if toggle menu is false , go to true
  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  useEffect(() => {
    setRole(role)
  }, [])
  useEffect(() => {
    setImage(image)
  }, [])



  return (
    <Router>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
       <link rel="preconnect" href="https://fonts.googleapis.com"/>
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
       <link href="https://fonts.googleapis.com/css2?family=Ultra&display=swap" rel="stylesheet"/>
       
      <nav >
        {(toggleMenu || screenWidth > 500) && (
          <Nav className="list">
              <div className="logo">
              <i class="fas fa-hands-helping"></i>
             <h3>ASD Job Portal</h3>
  
             </div>

            <Nav.Link href="/Home" id="nav-dropdown" >Home</Nav.Link>
            {/*<NavDropdown
              variant="secondary"
              title="Job"
              id="nav-dropdown"
            >
           <NavDropdown.Item href="/AllJobsList" id="nav-items" >All Jobs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/JobCategoryList" id="nav-items">Job Categories</NavDropdown.Item>
            </NavDropdown> */}
            {(crole === '[APPLICANT]') ? <Nav.Link href="/AllBookmarkJobList" id="nav-dropdown" >Bookmarks</Nav.Link> : ""}
            {(crole === '[APPLICANT]') ? <Nav.Link href="/AllViewedJobsList" id="nav-dropdown" >Viewed</Nav.Link> : ""}
            {(crole === '[ADMIN]') ?
              <NavDropdown
                variant="secondary"
                title="Applicant"
                id="nav-dropdown"
              >
                <NavDropdown.Item href="/ApprovedApplicantList" id="nav-items" >Approved Applicants</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/RejectedApplicantList" id="nav-items" >Blocked Applicant</NavDropdown.Item>
              </NavDropdown>
              : ""}

            {(crole === '[ADMIN]') ?
              <NavDropdown
                variant="secondary"
                title="Reviews"
                id="nav-dropdown"
              >
                <NavDropdown.Item href="/ApprovedReviewList" id="nav-items" >Approved Reviews</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/RejectedReviewList" id="nav-items" >Rejected Reviews</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/ReportedReviewList" id="nav-items" >Reported Reviews</NavDropdown.Item>
              </NavDropdown>
              : ""}
            {(crole === '[ADMIN]') ? <Nav.Link href="/UserList" id="nav-dropdown">All Users</Nav.Link> : ""}
            {crole == null ? <Nav.Link href="/CreateUser" id="nav-dropdown">Register</Nav.Link> : ""}
            {crole == null ? <Nav.Link href="/Login" id="nav-dropdown">Login</Nav.Link> : ""}
            {crole !== null ? <Nav.Link href="/EditUser" id="nav-dropdown">Edit Profile</Nav.Link> : ""}
            {crole !== null ? <Nav.Link href="/logout" id="nav-dropdown">Logout</Nav.Link> : ""}
           &nbsp;&nbsp;&nbsp;&nbsp;
            {cimage!==null ? <Avatar alt="images" src={`data:image/jpeg;base64, ${cimage}`}/> :""}
          </Nav>

        )}
        <button onClick={toggleNav} className="btn1" ><Logo /></button>
        
      </nav>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/Home' component={Home} />
        <Route exact path='/ApprovedReviewList' component={ApprovedReviewList} />
        <Route exact path='/RejectedReviewList' component={RejectedReviewList} />
        <Route exact path='/ReportedReviewList' component={ReportedReviewList} />
        <Route exact path='/ApprovedApplicantList' component={ApprovedApplicantList} />
        <Route exact path='/RejectedApplicantList' component={RejectedApplicantList} />
        <Route exact path='/AllJobsList' component={AllJobsList} />
        <Route exact path='/AllViewedJobsList' component={AllViewedJobsList} />
        <Route exact path='/AllBookmarkJobList' component={AllBookmarkJobList} />
        <Route exact path='/JobCategoryList' component={JobCategoryList} />
        <Route exact path='/JobListPerCategory' component={JobListPerCategory} />
        <Route exact path='/j/:id' component={JobListPerCategory} />
        <Route exact path='/ReviewListJobCompanyCategory' component={ReviewListJobCompanyCategory} />
        <Route exact path='/job/detail/:id/:id2/:id3' component={JobDetail} />
        <Route exact path='/s/:id/:id2' component={ReviewListJobCompanyCategory} />
        <Route exact path='/CreateUser' component={CreateUser} />
        <Route exact path='/UserList' component={UserList} />
        <Route exact path='/EditUser' component={EditUser} />
        <Route path='/users/:username' component={EditUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={authservice.logout} />
      </Switch>
    </Router>


  )
}
