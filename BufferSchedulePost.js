import React, { Component } from "react";
import { Card, CardTitle, CardText, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import { post, postLater, put, getById } from "../../services/buffer.service";
import styles from "../userRoles/UserRolesList.module.css";

class BufferSchedulePost extends Component {
  state = {
    id: "",
    businessId: "",
    message: "",
    photoUrl: "",
    linkUrl: "",
    videoUrl: "",
    scheduledAt: "",
    startDate: new Date(),
    startTime: ""
  };

  componentDidMount = () => {
    const { postId } = this.props.match.params;
    if (postId) {
      getById(postId).then(response => {
        this.setState({
          message: response.data.item.message,
          photoUrl: response.data.item.photoUrl,
          linkUrl: response.data.item.linkUrl,
          videoUrl: response.data.item.videoUrl,
          businessId: response.data.item.businessId
        });
      });
    }
  };

  scheduleNowPost = () => {
    const { postId } = this.props.match.params;
    const thisId = this.state.businessId;
    post(postId, thisId, {
      message: this.state.message,
      photoUrl: this.state.photoUrl,
      linkUrl: this.state.linkUrl,
      videoUrl: this.state.videoUrl,
      businessId: this.state.businessId
    }).then(response => {
      NotificationManager.success("Success!", "Your Post Has Been Shared");
    });
  };

  scheduledAtUpdate = () => {
    const { postId } = this.props.match.params;
    var rightTime = this.state.startDate;

    put(postId, {
      id: postId,
      scheduledAt: rightTime.format()
    }).then(response => {
      console.log(response);
    });
  };

  scheduleLater = () => {
    const { postId } = this.props.match.params;
    var rightTime = this.state.startDate;

    postLater({
      postId: postId,
      message: this.state.message,
      photoUrl: this.state.photoUrl,
      linkUrl: this.state.linkUrl,
      videoUrl: this.state.videoUrl,
      businessId: this.state.businessId,
      scheduledAt: rightTime
    }).then(response => {
      console.log(response);
      NotificationManager.success("Success!", "Your Post Has Been Scheduled");
    });
  };

  handleDateChange = ({ startDate }) => {
    this.setState({ startDate });
  };

  handleChangeStart = startDate => this.handleDateChange({ startDate });

  handleButtonClicked = () => {
    this.props.history.push("/admin/buffer");
  };

  routeToPost = () => {
    this.props.history.push("/admin/posts");
  };

  render() {
    const { postId } = this.props.match.params;

    return (
      <div>
        <div className="row">
          <div className="col-12">
            <Card>
              <CardTitle>Schedule Posts</CardTitle>
              <CardText className={styles.alignButton}>
                <Button type="button" className="btn btn-danger" onClick={this.handleButtonClicked}>
                  View Social Media Accounts
                </Button>{" "}
              </CardText>
            </Card>
            <DatePicker
              selected={moment(this.state.startDate)}
              onChange={this.handleChangeStart}
              // withPortal
              startDate={this.state.startDate}
              minDate={new Date()}
              showTimeSelect
              timeFormat="hh:mm"
              timeIntervals={5}
              dateFormat="YYYY-MM-DD hh:mm a"
              timeCaption="time"
              className="form-control"
            />
            <Button
              type="button"
              style={{ marginBottom: "0rem", marginLeft: "1rem" }}
              disabled={this.state.startDate <= new Date()}
              onClick={() => {
                this.scheduledAtUpdate();
                this.scheduleLater();
              }}
            >
              Schedule Post
            </Button>
          </div>
        </div>
        {
          <div className="card">
            <div className={styles.alignButton}>
              <i
                className="ft-x-square danger"
                style={{ fontSize: "25px" }}
                onClick={this.routeToPost}
              />
            </div>
            <div>
              <Button className="btn btn-primary" onClick={() => this.scheduleNowPost(postId)}>
                Share Now
              </Button>{" "}
            </div>

            <div className="card-body py-12 px-12">
              <img
                style={{
                  marginTop: 50 + "px",
                  marginLeft: 265 + "px",
                  width: 50 + "%",
                  height: 60 + "%"
                }}
                className="card-img-top"
                src={this.state.photoUrl}
                alt="Card"
              />
              <br />
              <div className="row">
                <div className="card-block" style={{ width: 50 + "%", marginLeft: 268 + "px" }}>
                  <h4 className="card-title"> {this.state.message}</h4>
                  <br />
                  <a href={this.state.videoUrl}>{this.state.videoUrl}</a>
                  <br />
                  <a href={this.state.linkUrl}>{this.state.linkUrl}</a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default BufferSchedulePost;
