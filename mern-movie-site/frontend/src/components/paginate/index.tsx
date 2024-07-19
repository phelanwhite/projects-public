import { memo } from "react";
import style from "./style.module.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

const Paginate = ({ ...props }: ReactPaginateProps) => {
  return (
    <div>
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

export default memo(Paginate);
