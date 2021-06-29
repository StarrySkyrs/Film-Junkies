import React from 'react';
import axios from 'axios';
import config from '../config/api.config'
import TvPoster from '../components/tv.component'
import Category from './category.component'

export default class TvShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            search:null,
            categories:[]
        }
    }
    componentDidMount(){
        this.getMovies();
    }
    getMovies=()=> {
        //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
        axios.get(`https://api.themoviedb.org/3/tv/popular?&api_key=${config.api_key}&language=en-US&page=1`)
        .then((response) => {
            console.log(response.data.results)
            this.setState({movies:response.data.results})
        })
        axios.get(`https://api.themoviedb.org/3/genre/tv/list?&api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            console.log(response.data.genres)
            this.setState({categories:response.data.genres})
        })
    }
    handleSearch=(event)=>{
        let keyword = event.target.value;
        this.setState({search:keyword})
    }
    render() {
        const searchFilter = this.state.movies.filter((data)=>{
            if(this.state.search == null)
                return data
            else if(data.title.toLowerCase().includes(this.state.search.toLowerCase())){
                return data
            }
        })
        return(

            <div style={{marginTop:'100px'}} className="container-fluid">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        {this.state.categories.map((category,i) =>{
                            if(i===0){
                                return <a class="nav-item nav-link active" id={`nav-${category.id}-tab`} data-toggle="tab" href={`#nav-${category.id}`} role="tab" aria-controls={`nav-${category.id}`} aria-selected="true">{category.name}</a>
                            }
                            return <a class="nav-item nav-link" id={`nav-${category.id}-tab`} data-toggle="tab" href={`#nav-${category.id}`} role="tab" aria-controls={`nav-${category.id}`} aria-selected="true">{category.name}</a>
                        })}
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    {this.state.categories.map((category,i) =>{
                        if(i===0){
                            return <div class="tab-pane fade show active" id={`nav-${category.id}`} role="tabpanel" aria-labelledby={`nav-${category.id}-tab`}>
                                        <Category type="tv" id={category.id}/>
                                    </div>
                        }
                        return <div class="tab-pane fade show" id={`nav-${category.id}`} role="tabpanel" aria-labelledby={`nav-${category.id}-tab`}>
                            <Category type="tv" id={category.id}/>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}