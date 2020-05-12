import React, { Component } from 'react'
import styled from 'styled-components'

import {insertMovie} from '../api/api'







const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class MoviesCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            rating: '',
            time: '',
        }
    }

    handleInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ rating })
    }

    handleInputTime = async event => {
        const time = event.target.value
        this.setState({ time })
    }

    handleCreateMovie = async () => {
        const { id, name, rating, time } = this.state
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }

        await insertMovie(payload).then(res => {
            window.alert(`Movie Created successfully with ID: `+res.data.id)
            this.setState({id: res.data.id,})})
    }


    render() {
        const { name, rating, time } = this.state
        return (
            <Wrapper>
                <Title>Create Movie</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    onChange={this.handleInputName}
                />

                <Label>Rating: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    onChange={this.handleInputRating}
                />

                <Label>Time: </Label>
                <InputText
                    type="text"
                    onChange={this.handleInputTime}
                />

                <Button onClick={this.handleCreateMovie}>Create Movie</Button>
                <CancelButton href={'/movies/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default MoviesCreate