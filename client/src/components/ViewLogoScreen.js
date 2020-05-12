import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            borderColor
            backgroundColor
            fontSize
            borderRadius
            borderWidth
            padding
            margin
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

  

    render() {

        
        
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    
                    return (
                        <div className="container">
                            <nav className="nav-bar">
                                <div className="nav-wrapper">
                                    <div className="panel-heading">
                                        <h4><Link style={{ color: "black" }} to="/">Home</Link></h4>

                                    </div>
                                </div>
                            </nav>
     
                                
                            <div className="parent" style={{ display: "flex" }}>
                                <div className="panel-body" >
                                    <div className="card red darken" style={{ backgroundColor: "red" }}>

                                        <div >
                                            <h3 className="panel-title" style={{ textAlign: "center" }}>
                                                View Logo
                                            </h3>
                                        </div>


                                    <dl>
                                        
                                        <dt>Text:</dt>
                                        <div className="col s8" style={{display:"inline-grid"}}>
                                            <pre  style={{overflow:"auto"}}>
                                        <dd  >{data.logo.text}</dd>
                                        </pre>
                                          </div>   
                                        <dt>Color:</dt>
                                        <dd>{data.logo.color}</dd>
                                        <dt>borderColor:</dt>
                                        <dd>{data.logo.borderColor}</dd>
                                        <dt>backgroundColor:</dt>
                                        <dd>{data.logo.backgroundColor}</dd>
                                        <dt>Font Size:</dt>
                                        <dd>{data.logo.fontSize}</dd>
                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.borderRadius}</dd>
                                        <dt>Border Width:</dt>
                                        <dd>{data.logo.borderWidth}</dd>
                                        <dt>padding:</dt>
                                        <dd>{data.logo.padding}</dd>
                                        <dt>margin:</dt>
                                        <dd>{data.logo.margin}</dd>
                                        <dt>Last Updated:</dt>
                                        <dd>{data.logo.lastUpdate}</dd>
                                    </dl>
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                    </div>
                                </div>
                                <div className="workspace">

                                    <pre
                                        className="logo" style={{
                                            backgroundColor: data.logo.backgroundColor,
                                            fontSize: data.logo.fontSize,
                                            borderColor: data.logo.borderColor,
                                            borderRadius: data.logo.borderRadius,
                                            borderWidth: data.logo.borderWidth,
                                            padding: data.logo.padding,
                                            margin: data.logo.margin, color: data.logo.color, borderStyle: "solid"
                                        }}
                                    >

                                        {data.logo.text}
                                    </pre>

                                </div>
                            </div>

                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;