import React, { Component } from 'react'

export class MainLayout extends Component {

    render() {

        let { children } = this.props

        return (
            <>
                <h1>MainLayout layout</h1>
                {children}
            </>
        )
    }
}
