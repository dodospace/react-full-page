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
                    <Section>1</Section>
                    <Section>2</Section>
                    <Section>3</Section>
                    <Section>4</Section>
                </SectionsBox>
            </div>
        );
    }
});

ReactDOM.render(<Demo />, document.getElementById('app'));
