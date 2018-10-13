import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";

class Detail extends Component {
  state = {
    job: {}
  };

  render() {
    return (
      <div>
            <Jumbotron>
              <h1>
                {this.state.job.title} by {this.state.job.author}
              </h1>
            </Jumbotron>
            <article>
              <h1>Synopsis</h1>
              <p>
                {this.state.job.synopsis}
              </p>
            </article>
         
            <Link to="/">← Back to Authors</Link>
			</div>
    );
  }
}

export default Detail;
