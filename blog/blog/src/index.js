import React from "react";
import ReactDOM from "react-dom";
import {marked} from "marked";

import {blogdata} from "./blogdata"

import "../node_modules/github-markdown-css/github-markdown.css"

//import "./styles.css";

// Allows line breaks with return button
marked.setOptions({
  breaks: true
});
console.log("Testingan");
console.log({blogdata});
console.log({blogdata}["blogdata"][0]["blog"]);
// Set a function to be used by the marked Renderer, the bit that takes markdown and translates it to html.
const renderer = new marked.Renderer();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: {blogdata}["blogdata"][0]["blog"]
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  render() {
    return (
      <div class="row">
        <Breadcrumb></Breadcrumb>

        <div class="col-lg-10">
          <Previewer markdown={this.state.markdown} />
        </div>

      </div>
    );
  }
}

function Breadcrumb(){
  const data = {blogdata}["blogdata"];
  
  const listItems =data.map((data,index) =>
    // <li>{number}</li>
    //console.log("index:"+ index + "\n" + data["name"])
    <ol class="breadcrumb blogItems">
      <li class="breadcrumb-item">{data['name']}</li>
    </ol>      
  );
  return (
    <div class="col-lg-2 breadcrumblog">
      {listItems}
    </div>
    
  );
}

const Toolbar = (props) => {
  return <div className="toolbar">{props.text}</div>;
};

const Editor = (props) => {
  return (
    <textarea
      id="editor"
      value={props.markdown}
      onChange={props.onChange}
      type="text"
    />
  );
};

const Previewer = (props) => {
  return (
    <div
      id="previewer"
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer })
      }}
    />
  );
};

const rootElement = document.getElementById("div_content");
ReactDOM.render(<App />, rootElement);


// function getReadme(user, repo) {
//   fetch(`https://api.github.com/repos/${user}/${repo}/contents/README.md`) // Fetch the file from GitHub's api
//       .then(response => response.json())
//       .then(data => {
//           const content = atob(data.content); // Convert from base64 to readable text
               
//           console.log(content); // Log the content to the console
//       })
//       .catch(error => console.log(error)); // Catch any errors
// }

// getReadme("jomielenriquez", "jomielenriquez.github.io");