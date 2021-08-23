import React, { Component } from "react";
import DataService1 from "../../Services/WebUserReviewService";
import { Link } from "react-router-dom";

  export default class ReviewListJobCompanyCategory extends Component {
    constructor(props) {
      super(props);
     
      
      this.state = {
        reviews: []
      };
    }

  componentDidMount() {
    DataService1.getReviewByJobandCompany(this.props.match.params.id,this.props.match.params.id2).then((res) =>{
      this.setState({reviews:res.data});
    }).catch(e => {
      console.log(e);
    });
  }


  render(){
    const{reviews} = this.state;
    return(
      <div>
        <h2 className="text-center">Approved Review List</h2>
        <div className="row">
          <table className = "table table-striped table-bordered">
            <thead>
              <tr>
                
                <th>Review Stars</th>
                <th>Review Description</th>
                <th>Review Date</th>
                <th>Company</th>
                <th>Job Title</th>
        
              </tr>
            </thead>
            <tbody>
              {
                this.state.reviews.map(review => 
                <tr key = {review.reviewDescription}>
                  <td>{review.reviewstars}</td>
                  <td>{review.reviewDescription}</td>
                  <td>{review.reviewDate}</td>
                  <td>{review.companyName}</td>
                  <td>{review.jobTitle}</td>
                  
                </tr>  
                  )
              }
            </tbody>
  
          </table>
        </div>
  
      </div>
    );
  
  }

}
