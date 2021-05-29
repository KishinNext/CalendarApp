import React from 'react'

export const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark">
            <span className="navbar-brand ml-3">
                Jairo
            </span>
            <button className='btn btn-outline-danger mr-3'>
                <i className='fas fa-sign-out-alt'></i>
                <span> Salir</span>
            </button>
        </div>
    )
}
