import React, { Component } from "react";
import { Card, CardTitle } from "reactstrap";
import styles from "../userRoles/UserRolesList.module.css";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";

class BufferInfo extends Component {
  state = {
    updates: []
  };

  componentDidMount = () => {
    axios.get("/api/buffers/updates/" + 39).then(response => {
      console.log(response);
      this.setState({ updates: response.data.items });
    });
  };

  backHandler = () => {
    this.props.history.push("/admin/buffer");
  };

  render() {
    const postUpdates = this.state.updates;

    return (
      <div>
        <div className="row">
          <div className="col-12 mt-3 mb-1">
            <Card style={{ padding: "20px" }}>
              <CardTitle>
                Post History Statistics{" "}
                <i
                  className={"ft-x-square color: red action float-right"}
                  style={{
                    fontSize: "25px"
                  }}
                  onClick={this.backHandler}
                />
              </CardTitle>
            </Card>
          </div>
        </div>
        <Card>
          <div className="card-body ">
            <div className="card-block">
              <table className="table table-hover">
                <thead>
                  <tr className={styles.alignText}>
                    <th>Post</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Retweets</th>
                    <th>Favorites</th>
                    <th>Mentions</th>
                    <th>Reach</th>
                    <th>Clicks</th>
                  </tr>
                </thead>
                {postUpdates.map(list => (
                  <tbody key={list.id}>
                    <tr className={styles.alignText}>
                      <td className="text-truncate">
                        <a href={list.service_link} target="_blank" rel="noopener noreferrer">
                          <span className="avatar avatar-xs">
                            {list.media ? (
                              <img className="box-shadow-2" src={list.media.picture} alt="avatar" />
                            ) : (
                              <p>No Image</p>
                            )}
                          </span>
                        </a>
                      </td>
                      <td>{moment(list.createdAt).format("DD-MMM-YYYY, hh:mm a")}</td>
                      <td>{list.status}</td>
                      <td>
                        {list.statistics.retweets >= 20 ? (
                          <b className="color: green">{list.statistics.retweets}</b>
                        ) : (
                          <span>{list.statistics.retweets}</span>
                        )}
                      </td>
                      <td>
                        {list.statistics.favorites >= 20 ? (
                          <b className="color: green">{list.statistics.favorites}</b>
                        ) : (
                          <span>{list.statistics.favorites}</span>
                        )}
                      </td>
                      <td>
                        {list.statistics.mentions >= 20 ? (
                          <b className="color: green">{list.statistics.mentions}</b>
                        ) : (
                          <span>{list.statistics.mentions}</span>
                        )}
                      </td>
                      <td>
                        {list.statistics.reach >= 20 ? (
                          <b className="color: green">{list.statistics.reach}</b>
                        ) : (
                          <span>{list.statistics.reach}</span>
                        )}
                      </td>
                      <td>
                        {list.statistics.clicks >= 20 ? (
                          <b className="color: green">{list.statistics.clicks}</b>
                        ) : (
                          <span>{list.statistics.clicks}</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    currentBusiness: state.currentBusiness
  };
}
export default connect(mapStateToProps)(BufferInfo);
