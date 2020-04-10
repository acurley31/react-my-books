import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList.js';


class Library extends Component {
    
    getBooksOnShelf = (shelfId) => {
        return this.props.books.filter(item => item.shelfId === shelfId)
    }

    render() {
        return (
            <div className='library-container'>
                <header className='library-header'>
                    <h1 className='library-title'>My Books</h1>
                </header>

                { this.props.shelves.map(shelf => (
                    <BookList 
                        key={shelf.id}
                        name={shelf.name}
                        isLoading={this.props.isLoading}
                        books={this.getBooksOnShelf(shelf.id)} 
                        addBook={this.props.addBook}
                        removeBook={this.props.removeBook}
                    />
                ))}
            
                <Link to='/search' className='icon-button fab'>
                    <span className='material-icons'>add</span>
                </Link>
            </div>
        )
    }

}
export default Library;
