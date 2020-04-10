import React, { Component } from 'react';
import Book from './Book.js';


class BookList extends Component {

    render() {
        
        if (this.props.isLoading) {
            return (
                <div className='book-list-empty-container'>
                    <span className='book-list-loading-spinner'></span>
                    <p>Searching...</p>
                </div>
            )
        }

        return (
            <div className='book-list-container'>
                <h2 className='book-list-name'>{ this.props.name }</h2>
                
                { this.props.books.length === 0 &&
                    <div className='book-list-empty-container'>
                        <p>An empty shelf is a sad shelf</p>
                    </div>
                }
                
                <div className='book-list'>
                    { this.props.books.map(book => (
                        <Book
                            key={book.id}
                            book={book}
                            addBook={this.props.addBook}
                            removeBook={this.props.removeBook}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default BookList;
