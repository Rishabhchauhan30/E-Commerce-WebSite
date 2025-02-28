import React, { Component } from 'react'
import Heading from '../Reuseable/Heading'
import Img from 'gatsby-image'

const getCat = items => {

    let holdItems = items.map(items => {   //take all categories from CONTENTFULL
        return items.node.category
    })
    let holdCategories = new Set(holdItems)    //it is a set --- so it holds only unique values not duplicates value are hold here
    let categories = Array.from(holdCategories)   //to iterate through or data we used a array --- this array is containing all unique categories
    categories = ["all", ...categories]    //all the values will be added here
    return categories
}



export default class CourseCart extends Component {
    constructor(props){
        super(props)
        this.state = {
            courses : props.mycourses.edges,           
            ourcourses : props.mycourses.edges,
            mycategories : getCat(props.mycourses.edges), 
        }
    }

    catyClicked = category => {
        let keepItSafe = [...this.state.courses]

        if(category === 'all'){
            this.setState(() => {
                return { ourcourses: keepItSafe}
            })
        } else {
            let holdMe = keepItSafe.filter(({  node }) => node.category === category)
            this.setState(() => {
                return { ourcourses: holdMe}
            })
        }
    }

    render() {
        //console.log(this.state.courses);
        return (
            <section className="py-5">
            <div className="container">
            <Heading title="Courses"/>
            <div className="row my-3">
                <div className="col-10 mx-auto text-center">
                    {this.state.mycategories.map((category, index) =>{
                        return (
                            <button
                                type = "button"
                                className="btn btn-info m-3 px-3"
                                key={index}
                                onClick={() => {
                                    this.catyClicked(category)
                                }}
                                >
                                    {category}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className="row">
            {
                this.state.ourcourses.map(({ node }) => {
                    return(
                        <div key={node.id} className="col-11 col-md-6 d-flex my-3 mx-auto">
                        <Img fixed={node.image.fixed} />
                        <div className="flex-grow-1 px-3">
                        <div className="d-flex justify-content-between">
                        <h6 className="mb-0">{node.title} </h6>
                        <h6 className="mb-0 text-info"> $ {node.price}</h6>
                        </div>
                        <p className="text-muted">
                        <small>{node.description.description}</small>
                        </p>
                            <button 
                            data-item-id= {node.id}
                            data-item-name={node.title}
                            data-item-price={node.price}
                            data-item-url="https://rishabh-chauhan-rs3020.netlify.app/"
                            data-item-image={node.image.fixed.src}
                            className= "btn btn-info snipcart-add-item"
                            >
                            Join Now
                            </button>
                        </div>
                        </div>
                    )
                })}
            </div>
            </div>
            </section>   
        )}}
