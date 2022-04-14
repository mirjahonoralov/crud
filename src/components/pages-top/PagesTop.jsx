import React from "react";
import { Button } from "antd";
import { BtnWrapper, Wrapper } from "./PagesTop.style";
import { useSelector } from "react-redux";

const PagesTop = ({ handleDelete, handleEdit, handleAdd, selected, title }) => {
  const theme = useSelector((state) => state.themeReducer);
  return (
    <div>
      <h4 style={{ color: theme.textColor }}>{title}</h4>
      <Wrapper>
        <BtnWrapper>
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>
          {selected.length === 1 && (
            <Button type="primary" onClick={handleEdit}>
              Edit
            </Button>
          )}
          {selected.length !== 0 && (
            <Button danger type="primary" onClick={() => handleDelete()}>
              Delete
            </Button>
          )}
        </BtnWrapper>
      </Wrapper>
    </div>
  );
};

export default PagesTop;
