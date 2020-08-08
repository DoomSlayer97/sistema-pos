module.exports = (totalItems, page, pageSize) => {

    pageSize = pageSize != null ? pageSize : totalItems;
    
    let currentPage = page != null ? page : 1;

    let totalPages = totalItems != null ? Math.round(parseFloat(totalItems) / parseFloat(pageSize)) : 0;

    let startPage = currentPage - 5;
    let endPage = currentPage + 4;

    if(startPage <= 0) {

        endPage = totalItems;

        if(endPage > 10)
            startPage = endPage - 9;

    }

    return {
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startPage,
        endPage,
        offset: (currentPage - 1) * pageSize
    };

};

