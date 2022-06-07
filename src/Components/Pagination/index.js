import React from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import './styles.css';

const MAX_ITEMS = 3;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

function Pagination({ limit, total, offset, setOffset}) {

   const current = offset ? offset / limit + 1 : 1;
   const pages = Math.ceil(total / limit);
   const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
   const first = Math.min(
     Math.max(current - MAX_LEFT, 1),
     maxFirst
   );
   
   const onChangePage = (page) => {
     setOffset((page - 1) * limit);
   };

  return (
    <ul className='container-pagination'>
      <li>
        <button className='button-pagination-prev' onClick={() => onChangePage(current - 1)} disabled={current === 1}><BsArrowLeft /></button>
      </li>
      {Array.from({length: Math.min(MAX_ITEMS, pages)})
        .map((_, index) => index + first)
        .map((page) => (
          <li className='teste' key={page}>
            <button
              className={page === current ? 'pagination-button-active' : 'pagination-button'}
              onClick={() => onChangePage(page)}
            >
              {page}
            </button>
          </li>
        ))
      }
      <li>
        <button className='button-pagination-next' onClick={() => onChangePage(current + 1)} disabled={current === pages}><BsArrowRight /></button>
      </li>
    </ul>
  );
}

export default Pagination;