import React from 'react'

function Header() {
    return (
        <div className='bg-light shadow-sm' >
            <div className='container-fluid'>
           
                <nav class="navbar navbar-expand-lg  px-4">
                    <a class="navbar-brand" href="#">Estetica</a>
                    <div class="ms-3">
                        <span class="navbar-text">
                            Welcome Back, Rajesh<br />
                            <small>Hello, here you can manage your orders by zone</small>
                        </span>
                    </div>

                    <div class="collapse navbar-collapse justify-content-end align-items-center">
                        <form class="d-flex me-3" role="search">
                            <input class="form-control search-input" type="search" placeholder="Search..." aria-label="Search" />
                        </form>

                        <div class="position-relative me-3">
                            <button class="btn btn-outline-secondary">
                                <i class="bi bi-bell"></i>
                            </button>
                            <span class="notification-badge"></span>
                        </div>

                        <div class="d-flex align-items-center">
                            <div class="profile-circle me-2">AD</div>
                            <span>Profile</span>
                        </div>
                    </div>
                </nav>
           
        </div>
        </div>
    )
}

export default Header