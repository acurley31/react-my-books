import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class BookSearchForm extends Component {
    state = {
        query: '',
    }

    componentWillUnmount() {
        this.clearQuery()
    }

    updateQuery = (query) => {
        this.setState({ query: query })
        if (this.props.searchBooks) {
            this.props.searchBooks(query.trim().toLowerCase())
        }
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    render() {
        return (
            <div className='book-search-form-container'>
                <Link to='/' className='icon-button'>
                    <span className='material-icons'>arrow_back</span>
                </Link>

                <input type='text' 
                    placeholder='Search for books'
                    value={this.state.query}
                    onChange={(e) => this.updateQuery(e.target.value)}
                    className='book-search-form-input'
                />

                <button onClick={() => this.clearQuery()} className='icon-button'>
                    <span className='material-icons'>close</span>
                </button>
            </div>
        )
    }
}

export default BookSearchForm;
