import React from "react";
import { Route } from "react-router-dom";
import BufferPost from "./BufferPost";
import BufferSchedulePost from "./BufferSchedulePost";
import BufferInfo from "./BufferInfo";
import LoggedIn from "../Redux/LoggedIn";

function Buffer(props) {
  const prefix = props.match.path;

  return (
    <React.Fragment>
      <Route exact path={prefix} component={BufferPost} />
      <Route exact path={prefix + "/:postId(\\d+)"} component={BufferSchedulePost} />
      <Route
        exact
        path={prefix + "/statistics"}
        render={props => (
          <LoggedIn>
            <BufferInfo {...props} />
          </LoggedIn>
        )}
      />
    </React.Fragment>
  );
}

export default Buffer;
