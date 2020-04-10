import React, { Component } from 'react';
import BookSearchForm from './BookSearchForm.js';
import BookList from './BookList.js';


class BookSearch extends Component {

    render() {
        return (
            <div>
                <BookSearchForm searchBooks={this.props.searchBooks} />
                <BookList 
                    isLoading={this.props.isLoading}
                    books={this.props.results} 
                    addBook={this.props.addBook}
                />
            </div>
        )
    }
}

export default BookSearch;

