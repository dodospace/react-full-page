import React from 'react'
import ReactDOM from 'react-dom'
import { SectionsBox, Section, SectionCol } from '../index'

let Demo = React.createClass({
    render() {
        const props = {
            speed: 500
        }
        return (
            <div>
                <SectionsBox {...props}>
                    <Section>Page 1</Section>
                    <Section>Page 2</Section>
                    <Section>Page 3</Section>
                    <Section>Page 4</Section>
                </SectionsBox>
            </div>
        );
    }
});

ReactDOM.render(<Demo />, document.getElementById('app'));
