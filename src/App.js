import React, { Component } from 'react';
import './App.css';
import MovieRow from './movieRow.js'
import $ from 'jquery'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.Search()
  }

  Search(searchval) {
    console.log("Perform search using moviedb")
    const urlMovie = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchval
    $.ajax({
      url: urlMovie,
      success: (searchMovie) => {
        console.log("Fetched data successfully")
        
        const res = searchMovie.results

        var movieRows = []

        res.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          // console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchMov(event) {
    console.log(event.target.value)
    const object = this
    const searchTerm = event.target.value
    object.Search(searchTerm)
  }

  render() {
    return (
      <div>
        
        <table className="header">
          <tbody>
            <tr>
              <td>
                <img className="image" alt="app icon" width="50" src="TM DB logo.png"/>
              </td>
              <td width="8"/>
              <td>
                <h1>TMDB Movie Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input className="movieEnter" onChange={this.searchMov.bind(this)} placeholder="Enter Movie Name"/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;