import { FC } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";

import style from "./style.module.css";

const Paginate: FC<ReactPaginateProps> = ({ ...props }) => {
  return (
    <div className="py-4">
      <ReactPaginate
        breakLabel="..."
        pageRangeDisplayed={5}
        previousLabel={<GrFormPrevious />}
        nextLabel={<GrFormNext />}
        containerClassName={style?.containerClassName}
        // pageClassName="pageClassName"
        pageLinkClassName={style?.pageLinkClassName}
        nextLinkClassName={style?.pageLinkClassName}
        previousLinkClassName={style?.pageLinkClassName}
        activeLinkClassName={style?.activeLinkClassName}
        renderOnZeroPageCount={null}
        {...props}
      />
    </div>
  );
};

export default Paginate;
