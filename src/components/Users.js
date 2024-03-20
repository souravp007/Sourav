import React, { useState, useMemo } from 'react';
import UserDetails from './UserDetails';
import '../styles/Users.css';
import useFetch from '../customhook/UseFetch';

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const pageSize = 10;

    const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

    const filteredAndSortedUsers = useMemo(() => {
        if (loading || error) {
            return [];
        }

        return users
            .filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            });
    }, [users, loading, error, searchQuery, sortOrder]);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;

    const currentPageUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredAndSortedUsers.length / pageSize);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div>
            <h1 className='title'>User List</h1>
            <div className="user-list">
                <input
                    type="text"
                    placeholder="Search by name or username"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th onClick={toggleSortOrder}>Name {sortOrder === 'asc' ? '⬆️' : '⬇️'}</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageUsers.map(user => (
                            <tr key={user.id} onClick={() => handleUserClick(user)}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.address.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
            {selectedUser && <UserDetails user={selectedUser} onClose={handleCloseModal} />}
        </div>
    );
};

export default Users;
