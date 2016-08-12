import React from 'react'

let Section = React.createClass({
    getInitialState() {
        return {
            action: this.props.current,
            slide: false,
            prev: this.props.prev,
            postionY: 0
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            action: nextProps.current,
            slide: nextProps.slide,
            prev: nextProps.prev,
            postionY: nextProps.postionY
        });
        setTimeout(()=> {
            this.setState({
                postionY: 0
            })
        },20);
    },
    render() {
        var slideClass, slideStyle;
        if (this.state.action == this.props.id) {
            slideClass = this.state.slide ? `page-row slide page-row-${this.props.id}` : `page-row current page-row-${this.props.id}`;
            slideStyle = {
                transform: `translate(0px, ${this.state.postionY}px)`,
                transitionDuration: `${this.props.speed}ms`
            }
        } else if (this.state.prev == this.props.id){
            slideClass = this.state.slide ? `page-row current page-row-${this.props.id}` : `page-row page-row-${this.props.id}`; 
                
        } else {
            slideClass = `page-row page-row-${this.props.id}`
        }
        
        return (
            <div ref="row" className={slideClass} style={slideStyle}>
                {this.props.children} 
            </div>
        );
    }
});

export default Section