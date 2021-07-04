import { Component } from "react";
import { Route,Link } from "react-router-dom";

import { getFilmById } from '../services/fetchApi'
import Reviews from '../components/Reviews'
import Cast from "../components/Cast";

import routes from "../routes";

class MoviesDetailPage extends Component{

    state = {
    film:{}
    }
    
    async componentDidMount() {

        const { location } = this.props
        const id = location.state.id

        const response = await getFilmById(id)
        
        this.setState({film:response.data})

     
    }

    handleGoBack = () => {
         const { location,history } = this.props

        history.push(location.state.from, { query:location.state.query})
    }

    render() {
        const { film } = this.state
       const {match,location} = this.props

        const defaultPoster = "https://media.comicbook.com/files/img/default-movie.png"
        const imgUrl="https://image.tmdb.org/t/p/w500/"

        return (
            <div>
                <button type='button' onClick={this.handleGoBack}>Go Back</button>
                 <div>
                        <h3>{film.title}</h3>
         
                     <img
                            src={film.poster_path !== undefined ? `${imgUrl}${film.poster_path}` : defaultPoster}
                            alt={film.title}
                            style={{
                                width : '350px',
                                heigth: "250px"
                            }
                        }
                    />
                    <p>{film.overview}</p>
                 </div>

                <ul>
                    <li><Link to={{
                        pathname:`${match.url}${routes.cast}`,
                        state: location.state
                    }}>Cast</Link></li>
                    <li><Link to={{
                        pathname:`${match.url}${routes.reviews}`,
                        state: location.state
                    }}>Reviews</Link></li>
                </ul>

                <Route
                    path={`${match.path}${routes.cast}`}
                    component={Cast} />
                <Route
                    path={`${match.path}${routes.reviews}`}
                    component={Reviews} />
            </div>
        )
    }
}
export default MoviesDetailPage