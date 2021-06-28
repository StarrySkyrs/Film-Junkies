import React from 'react';
import axios from 'axios';
import config from '../config/api.config'
import './detail.css'

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            images: [],
            search:null
        }
    }
    componentDidMount(){
        this.getDetails();
    }
    getDetails=()=> {
        //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
        //https://api.themoviedb.org/3/tv/84958?api_key=4caf30ffa3252eef2b9fa4dbc2f5554a&language=en-US
        axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}?&api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({details:response.data})
        })
        //https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US
        axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/images?&api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({images:response.data})
        })
    }
    render() {
        const detail = this.state.details
        return(
            <div>
                    <div style={{height:'100vh' ,backgroundSize:'cover', backgroundPosition:'center',backgroundImage:`url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`}}>
                        {/* <img  src={"https://image.tmdb.org/t/p/w500"+detail.poster_path} /> */}
                        <div style={{background:'rgb(197 191 191 / 14%)', height:'100%', paddingTop:'80px',textAlign:'-webkit-center'}}>
                            {detail.name && <p style={{color:'white', border: '1px solid', boxShadow:'5px 10px', width:'300px', padding:'10px', backgroundColor:'#00000087'}}>{detail.name}</p>}
                            {detail.original_title && <p style={{color:'white', border: '1px solid', boxShadow:'5px 10px', width:'300px', padding:'10px', backgroundColor:'#00000087'}}>{detail.original_title}</p>}
                            {detail.vote_average && <p style={{color:'white', border: '1px solid', boxShadow:'5px 10px', width:'300px', padding:'10px', backgroundColor:'#00000087'}}>Score: {detail.vote_average}({detail.vote_count})</p>}
                            {detail.tagline && <p style={{color:'white', border: '1px solid', boxShadow:'5px 10px', width:'300px', padding:'10px', backgroundColor:'#00000087'}}>{detail.tagline}</p>}
                            {detail.overview && <p style={{color:'white', border: '1px solid', boxShadow:'5px 10px', width:'300px', padding:'10px', backgroundColor:'#00000087'}}>{detail.overview}</p>}
                        </div>
                        
                    </div>
            </div>
        )
    }
}

const View = (props) => {
    return(
        <div>
            <p>{props.data.length}</p>
        </div>
    )
}