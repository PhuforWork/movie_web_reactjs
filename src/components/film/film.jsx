import React from "react";

export default function Film(props) {
//   console.log(props);
  const {maPhim,tenPhim,trailer,hinhAnh,moTa,ngayKhoiChieu,danhGia} = props.props
  return (
    <article className="flex flex-col dark:bg-green-200 w-60 ">
      <div className=" ">
        <img
          alt=""
          className="object-cover dark:bg-gray-500"
          src={hinhAnh}
        />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <a
          rel="noopener noreferrer"
          href="#"
          aria-label="Te nulla oportere reprimique his dolorum"
        ></a>
        <a
          rel="noopener noreferrer"
          href="#"
          className="text-xs tracking-wider uppercase hover:underline dark:text-violet-400"
        >
          Convenire
        </a>
        <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
          Te nulla oportere reprimique his dolorum
        </h3>
        <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
          <span>June 1, 2020</span>
          <span>2.1K views</span>
        </div>
      </div>
    </article>
  );
}
