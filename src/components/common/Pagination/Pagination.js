import classes from "./Pagination.module.css";
import React, {useState} from "react";

const Pagination = ({totalItemsCount, pageSize, currentPage, pageChanged, portionSize = 10}) => {
    const pages = [];
    const countOfPages = Math.ceil(totalItemsCount / pageSize);
    for (let i = 1; i <= countOfPages; i++) {
        pages.push(i);
    }
    const portionCount = Math.ceil(countOfPages / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;
    return (
        <>

            <div className={classes.pagination}>
                {portionNumber > 1 &&
                    <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>
                }
                {
                    pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                        .map(p => {
                            return <span key = {p} className={currentPage === p ? classes.selectedPage : classes.paginationItem}
                                         onClick={(e) => {
                                             pageChanged(p);
                                         }}>
                                        {p}
                            </span>
                        })
                }
                {portionCount > portionNumber &&
                    <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
                }
            </div>

        </>
    )
}

export default Pagination;