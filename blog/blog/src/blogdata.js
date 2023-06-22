export const blogdata = [
    {
        no: 0,
        name: "Welcome",
        blog: `# Welcome to my Blog!
## This section is created using react.js with marked installed
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

![React Logo w/ Text](https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg)`
    },
    {
        no: 1,
        name: "God Mode",
        blog: `
            <h1>"God Mode" in any windows system<h1>
            <img src="./blog/images/GodMode[1].png" class="img-fluid"/>
            <br/>
            <br/>
            <div style="font-size:20px;">
                If you want to have access in every settings in windows as you can see in the image above, you should follow these steps.
                <br/><br/>
                1. Create a new folder and set its name to <strong>"GodMode.{ED7BA470-8E54-465E-825C-99712043E01C}"</strong>
                <br/>
                2. Open the folder and now you will see all the different settings in windows.
            </div>
            
            
            

        `
    },
    {
        no: 1,
        name: "Installing and Using Mongoose",
        blog: `### This blog is all about installing and using mongoose
const mongoose = require('mongoose');
const mySecretURI = process.env['MONGO_URI']

let Person;

const connect = () => {
  mongoose.connect(mySecretURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
}

        `
    },
    // {
    //     no: 1,
    //     name: "First blog",
    //     blog: `
    //         <h1>This is the title<h1>
    //     `
    // }
]