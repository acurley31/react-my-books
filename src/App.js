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

    componentDidMount() {
        const storage = localStorage.getItem('react-my-books-state')
        const data = JSON.parse(storage)
        if (data) {
            this.setState(data)
        }
    }

    saveToStorage = () => {
        const data = JSON.stringify(this.state)
        localStorage.setItem('react-my-books-state', data)
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
        }), () => this.saveToStorage())
    }

    removeBook = (bookId) => {
        this.setState((prevState) => ({
            books: prevState.books.filter(b => b.id !== bookId)
        }), () => this.saveToStorage())
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
