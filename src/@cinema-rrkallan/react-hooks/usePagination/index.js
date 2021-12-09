import { useState, useEffect, useCallback } from "react";

const usePagination = (data, itemsPerPage = 5) => {
    const [totalItems, setTotalItems] = useState(() => data?.length || 0);
    const [totalPages, setTotalPages] = useState(() => Math.ceil(totalItems / itemsPerPage));
    const [currentPage, setCurrentPage] = useState(() => 1);
    const [endNumber, setEndNumber] = useState(() => Math.min(currentPage * itemsPerPage, totalItems));
    const [startNumber, setStartNumber] = useState(() => Math.max(currentPage * itemsPerPage - itemsPerPage + 1, 1));

    const prev = () => setCurrentPage((activePage) => (activePage > 1 && Math.max(activePage - 1, 1)) || activePage);

    const next = () => setCurrentPage((activePage) => (activePage < totalPages && Math.min(activePage + 1, totalPages)) || activePage);

    const jump = (pageNumber) => {
        if (pageNumber !== currentPage) {
            const page = Math.max(1, pageNumber);
            setCurrentPage(Math.min(page, totalPages));
        }
    };

    const currentData = useCallback(() => {
        const begin = startNumber - 1;
        const end = endNumber;
        const tempPageData = data.slice(begin, end);
        const pageData = tempPageData.map((item, index) => {
            const tempItem = {
                ...item,
                position: startNumber + index,
            };
            return tempItem;
        });

        return pageData;
    }, [data, endNumber, startNumber]);

    useEffect(() => {
        if (currentPage) {
            const end = Math.min(currentPage * itemsPerPage, totalItems);
            const start = Math.max(currentPage * itemsPerPage - itemsPerPage + 1, 1);

            setStartNumber(start);
            setEndNumber(end);
        }
    }, [currentPage, itemsPerPage, totalItems]);

    useEffect(() => {
        const items = data?.length || 0;
        const tempTotalPages = Math.ceil(items / itemsPerPage);
        setCurrentPage((pageNumber) => (pageNumber > tempTotalPages ? tempTotalPages : pageNumber));
        setTotalItems(() => items);
        setTotalPages(() => tempTotalPages);
    }, [data, itemsPerPage]);

    return { next, prev, jump, currentData, currentPage, totalPages, totalItems, startNumber, endNumber };
};

export default usePagination;
