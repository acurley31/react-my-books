import React, { Component } from 'react';


class Book extends Component {

    getBookCoverUrl = () => {
        return this.props.book.imageLinks?.thumbnail
    }

    getBookAuthor = () => {
        return this.props.book.authors
            ? this.props.book.authors.join(', ')
            : 'Unknown'
    }

    onAddBook = (e, shelfId) => {
        e.preventDefault()
        if (this.props.addBook) {
            this.props.addBook(this.props.book, shelfId)
        }
    }

    onRemoveBook = (e) => {
        e.preventDefault()
        if (this.props.removeBook) {
            this.props.removeBook(this.props.book.id)
        }
    }

    render() {
        return (
            <div className='book-container'>
                <div className='book-cover-container'>
                    <img className='book-cover'
                        alt='Cover not found'
                        src={this.getBookCoverUrl()}
                    />
                    <div className='book-actions'>
                        <button className='book-action-button' onClick={(e) => this.onAddBook(e, 0)}>
                            Save to currently reading
                        </button>
                        <button className='book-action-button' onClick={(e) => this.onAddBook(e, 1)}>
                            Save to next reads
                        </button>
                        <button className='book-action-button' onClick={(e) => this.onAddBook(e, 2)}>
                            Save to completed reads
                        </button>
                        
                        { this.props.removeBook &&
                        <button className='book-action-button' onClick={(e) => this.onRemoveBook(e)}>
                            Remove from library
                        </button> }
                    </div>
                </div>

                <div className='book-details'>
                    <h4 className='book-title'>{ this.props.book.title }</h4>
                    <h5 className='book-author'>{ this.getBookAuthor() }</h5>
                </div>
           </div>
        )
    }
}
export default Book;
