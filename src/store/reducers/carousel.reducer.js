const CAROUSEL_DEFAULT = {
  carouselBnr: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
};

export const carouselReducer = (
  state = CAROUSEL_DEFAULT,
  { type, payload }
) => {
  switch (type) {
    default:
      return state;
  }
};
