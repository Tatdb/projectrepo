import React, { Component } from "react";
import axios from "axios";
import { Card, CardBody, CardText, CardTitle, CardImg, Button } from "reactstrap";
import Paginator from "../../shared/Paginator";

class BufferPost extends Component {
  state = {
    data: [],
    pageIndex: 0,
    pageSize: 5,
    totalCount: 0,
    totalPages: 0
  };

  componentDidMount = () => {
    axios.get("/api/buffers").then(response => {
      this.setState({
        data: response.data.items
      });
    });
  };

  getUpdates = () => {
    this.props.history.push("/admin/buffer/statistics");
  };

  render() {
    const bufferData = this.state.data;

    return (
      <div>
        <div className="row">
          <div className="col-12 mt-3 mb-1">
            <Card style={{ padding: "20px" }}>
              <CardTitle>Social Media Profiles</CardTitle>
              <br />
              <CardText>
                <Button type="button" className="btn btn-primary" onClick={this.getUpdates}>
                  View Analytics
                </Button>{" "}
              </CardText>
            </Card>
          </div>
        </div>
        {bufferData ? (
          <>
            {bufferData.map(list => (
              <div key={list.id}>
                <div className="col-xl-3 col-lg-6 col-md-12">
                  <div className="card-deck">
                    <Card>
                      <div className="card-body">
                        <a className="profile-image">
                          <CardImg
                            style={{ maxWidth: "250px", maxHeight: "200px" }}
                            className="rounded-circle img-border gradient-summer width-100"
                            src={list.avatar_https}
                          />
                        </a>
                        <br />
                        <br />
                        <CardBody>
                          <CardText>
                            <b>
                              Social Media Platform:{""}
                              {""}
                            </b>{" "}
                            {list.formatted_service === "Twitter" && (
                              <i className="ft-twitter color: blue" style={{ fontSize: "25px" }} />
                            )}
                          </CardText>
                          <CardText>
                            <b>Username:{""}</b> <b>{list.formatted_username}</b>
                          </CardText>
                          <CardText>
                            <b>
                              Followers:{""}
                              {""}
                            </b>{" "}
                            <b>{list.statistics.followers}</b>
                          </CardText>
                        </CardBody>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>{null}</div>
        )}
        <Paginator
          currentPage={this.state.pageIndex}
          totalPages={this.state.totalPages}
          goTo={this.goToPage}
        />
      </div>
    );
  }
}

export default BufferPost;
