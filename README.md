# react-full-page
一个基于React的fullpage组件，第一个简陋目前只支持全屏切换

#Install
    
    npm install rc-fullpage

#Usage

###A basic usage
```javascript
import React                    from 'react';
import { SectionsBox, Section } from 'rc-fullpage';
require('./index.css');         // This 'index.css' file is derived from the root directory

const props = {
    ...
}

// => in the render() method of your app
return (
    <SectionsBox {...props}>
        <Section>Page One</Section>
        <Section>Page Two</Section>
        <Section>Page Three</Section>
        <Section>Page Four</Section>
    </SectionsBox>
);

```

###Default Props
```javascript
const props = {
    speed:  800, // slide speed
}
```

#Example


    git clone https://github.com/dodospace/react-full-page.git
    npm install
    npm start

Local documentation will then be available at `http://localhost:2008/`.