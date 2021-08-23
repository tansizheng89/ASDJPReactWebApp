import React, { Component } from "react";
import StudentService from "../Services/StudentService";

export default class EditReviewStatus extends Component {
    constructor(props) {
        super(props);
        this.onChangeReviewStatus = this.onChangeReviewStatus.bind(this);
        this.onChangeReviewId = this.onChangeReviewId.bind(this);
        this.getReviewById = this.getReviewById.bind(this);
        this.updateReviewStatus = this.updateReviewStatus.bind(this);

        this.state = {
            currentReview: {
                id: null,
                studentId: "",
                company: "",
                job: "",
                applicant: "",
                reviewDate: "",
                reviewDescription: "",
                reviewstars: "",
                reviewStatus: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getReviewById(this.props.match.params.id).then((res) =>{
            console.log(res);
          }).catch(e => {
            if (e.response.status === 403) {
                StudentService.getUserUseRefreshToken();
                };
            console.log(e);
            window.location.reload();
          });
    }

    onChangeReviewId(e) {
        const id = e.target.value;

        this.setState(function (prevState) {
            return {
                currentReview: {
                    ...prevState.currentReview,
                    id: id
                }
            };
        });
    }
    onChangeReviewStatus(e) {
        const reviewStatus = e.target.value;

        this.setState(function (prevState) {
            return {
                currentReview: {
                    ...prevState.currentReview,
                    reviewStatus: reviewStatus
                }
            };
        });
    }
    
    getReviewById(id) {
        StudentService.getReviewById(id)
            .then(response => {
                this.setState({
                    currentReview: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateReviewStatus() {
        StudentService.updateReviewStatus(
            this.state.currentReview.id,
            this.state.currentReview.reviewStatus            
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The review was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        const { currentReview } = this.state;

        return (
            <div>
                {currentReview ? (
                    <div className="edit-form">
                        <h4>Student</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="reviewId">ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    value={currentReview.id}
                                    onChange={this.onChangeReviewStatus}
                                />   
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Review Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="reviewStatus"
                                    value={currentReview.reviewStatus}
                                    onChange={this.onChangeReviewStatus}
                                />
                            </div>
                        </form>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateReview}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Review...</p>
                        </div>
                    )}
            </div>
        );
    }
}
