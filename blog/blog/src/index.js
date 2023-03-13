import React from "react";
import ReactDOM from "react-dom";
import {marked} from "marked";

//import "./styles.css";

// Allows line breaks with return button
marked.setOptions({
  breaks: true
});

// Set a function to be used by the marked Renderer, the bit that takes markdown and translates it to html.
const renderer = new marked.Renderer();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder
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
      <div>
        {/* <h1 class="title">React Markdown Previewer</h1>
        <div class="card border-primary mb-3 editor">
          <div class="card-header">
            <i class="fa-solid fa-pen-to-square"></i>Editor{" "}
          </div>
          <div class="card-body">
            <Editor
              markdown={this.state.markdown}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div class="card border-primary mb-3 editor">
          <div class="card-header">
            <i class="fa-solid fa-pen-to-square"></i>Editor{" "}
          </div>
          <div class="card-body">
          </div>
        </div> */}
        <Previewer markdown={this.state.markdown} />
      </div>
    );
  }
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

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://libormarko.github.io/), and
> Block Quotes!

And if you want to get really crazy, even tables:

||Table Name|Type|Comment|
|:--:|:--:|:--:|:--:|
||CID|INT(11)||
||FILETYPE|VARCHAR(10)|IMG - image, VID - video, TXT - text|
||FILELOCATION|VARCHAR(250)|location of the file|
||TEXTHEADER|VARCHAR(50)|Announcement header if text|
||TEXTCONTENT|VARCHAR(50)|Announcement content if text|
||BC|VARCHAR(50)|Background color of text|
||ORDER|INT(11)|Ordering of the announcements|

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg)
`;

const rootElement = document.getElementById("div_content");
ReactDOM.render(<App />, rootElement);
