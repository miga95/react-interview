import React from 'react'

export default function Pagination({movies, currentPage, setCurrentPage, itemsPerPage, setItemsPerPage}) {

    const totalPages = Math.ceil(movies.length / itemsPerPage); 

    // Obtenir les films de la page actuelle
    const handlePrevPage = () => { 
        if(currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const handleNextPage = () => {
        const totalPages = Math.ceil(movies.length / itemsPerPage);
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = parseInt(event.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); 
    };

    return (
        <div className='flex flex-col items-center pb-5'>
            <div className="items-per-page">
                <label>Éléments par page:</label>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                </select>
            </div>
            <div className="pagination mt-2">
                <button className='btn' onClick={handlePrevPage} disabled={currentPage === 1}>Précédent</button>
                <span className='mx-2'>{currentPage} / {totalPages}</span>
                <button className='btn' onClick={handleNextPage} disabled={currentPage === totalPages}>Suivant</button>
            </div>
        </div>
    )
}
