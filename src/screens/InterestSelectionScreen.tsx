import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { CategoryState, setCategory, setSubCategory, SubCategoryState } from '../store/stringSlice';
import { categories } from "../data/categoryList";

const InterestSelectionScreen = () => {
  const dispatch = useDispatch();

  const [categoryID, setCategoryID] = useState(100);

  const navigate = useNavigate();

  const handleCategorySelection = (category: number, subcategory: number, route: string) => {
    dispatch(setCategory(category as CategoryState));
    dispatch(setSubCategory(subcategory as SubCategoryState))
    navigate(route);
  };

  const handleCategoryExpansion = (id: number) => {
    setCategoryID(id);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex justify-center py-4">
        <div className="bg-home rounded-full w-76 h-14 md:w-76 md:h-16 flex items-center justify-center p-4">
          <h1 className="text-xl md:text-2xl font-bold text-white" onClick={() => handleCategoryExpansion(100)}>Data Market Categories</h1>
        </div>
      </div>

      {categoryID == 100 &&

        <>
          {categories.map((item) => (

            <div className="grid grid-cols-1 w-full gap-4 px-4 py-2" key={item.id}>
              <div onClick={() => handleCategoryExpansion(item.id)} style={{ backgroundImage: `url(${item.image})` }} className="bg-cover group rounded-lg p-12 transition relative duration-300 cursor-pointer">
                <p className="text-home text-2xl flex justify-start pt-2 fill-blue-500">{item.category}</p>
              </div>
            </div>
          ))}
        </>
      }

      {categoryID < 100 &&
        <div className="container px-4 mx-auto">
          <div className="mx-auto p-6 pb-1  bg-white rounded-md">
            <div className="flex flex-wrap">
              <div
                className="mx-auto w-full max-w-xs relative flex flex-col items-center justify-center text-center overflow-visible"
              >
                <p className="text-sm mb-4">
                  {categories[categoryID].description}
                </p>

                <span
                  className="absolute -z-[1] backdrop-blur-sm inset-0 w-full h-full flex before:content-[''] before:h-3/4 before:w-full before:bg-gradient-to-r before:from-black before:to-purple-600 before:blur-[90px] after:content-[''] after:h-1/2 after:w-full after:bg-gradient-to-br after:from-cyan-400 after:to-sky-300 after:blur-[90px]"
                ></span>
              </div>
              {categories[categoryID].items.map((item) => (
                <div className="w-full border-b border-coolGray-100" onClick={() => handleCategorySelection(categoryID, item.id, "/screen3")}>
                  <div className="flex flex-wrap items-center justify-between py-4 -m-2">
                    <div className="w-auto p-2">
                      <div className="flex flex-wrap items-center -m-2">
                        <div className="w-auto p-2">
                          <div
                            className="flex items-center justify-center w-12 h-12 bg-yellow-50 rounded-md"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              height="24"
                              width="24"
                            >
                              <path
                                fill="#F59E0B"
                                d="M19 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM5 18C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V14.58L7.3 11.29C7.48693 11.1068 7.73825 11.0041 8 11.0041C8.26175 11.0041 8.51307 11.1068 8.7 11.29L15.41 18H5ZM20 17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H18.23L14.42 14.17L15.3 13.29C15.4869 13.1068 15.7382 13.0041 16 13.0041C16.2618 13.0041 16.5131 13.1068 16.7 13.29L20 16.58V17ZM20 13.76L18.12 11.89C17.5501 11.3424 16.7904 11.0366 16 11.0366C15.2096 11.0366 14.4499 11.3424 13.88 11.89L13 12.77L10.12 9.89C9.55006 9.34243 8.79036 9.03663 8 9.03663C7.20964 9.03663 6.44994 9.34243 5.88 9.89L4 11.76V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V13.76Z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="w-auto p-2 ">
                          <h2 className="text-sm font-medium text-coolGray-900">{item.name}</h2>
                          <h3 className="text-xs font-medium text-coolGray-400">44 photos</h3>
                          <p className="text-xs text-coolGray-500 font-medium">128 GB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default InterestSelectionScreen;
