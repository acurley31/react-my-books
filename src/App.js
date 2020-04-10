import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './utils/BooksAPI.js';
import Library from './Library.js';
import BookSearch from './BookSearch.js';


class App extends Component {
    
    state = {
        shelves: [
            { id: 0, name: 'Currently Reading' },
            { id: 1, name: 'Books To Read' },
            { id: 2, name: 'Completed Books' },
        ],
        books: [],
        searchResults: [],
        isLoading: false,
    }

    searchBooks = (query) => {
        if (query !== '') {
            this.setState({ isLoading: true })
            BooksAPI.search(query).then(res => {
                this.setState({ 
                    searchResults: res.error ? [] : res.map(book => ({ ...book, shelfId: null })), 
                    isLoading: false,
                })
            })
        } else {
            this.setState({ searchResults: [] }) 
        }
    }

    addBook = (book, shelfId) => {
        this.removeBook(book.id)
        this.setState((prevState) => ({
            books: [{ ...book, shelfId: shelfId}, ...prevState.books]
        }))
    }

    removeBook = (bookId) => {
        this.setState((prevState) => ({
            books: prevState.books.filter(b => b.id !== bookId)
        }))
    }

    filterSearchResults = () => {
        console.log(this.state.books)
        const booksOnShelves = this.state.books.map(b => b.id)
        return this.state.searchResults.filter(b => !booksOnShelves.includes(b.id))
    }
   
    getLibraryShelves = () => {
        return this.state.shelves
    }

    render() {
        return (
            <div>
                <Route exact path='/' render={() => (
                    <Library 
                        shelves={this.getLibraryShelves()} 
                        books={this.state.books}
                        isLoading={this.state.isLoading}
                        addBook={this.addBook}
                        removeBook={this.removeBook}
                    />
                )}/>
                
                <Route path='/search' render={() => (
                    <BookSearch
                        isLoading={this.state.isLoading}
                        results={this.filterSearchResults()}
                        searchBooks={this.searchBooks}
                        addBook={this.addBook}
                    />
                )}/>
            </div>
        )
    }
}
export default App;
