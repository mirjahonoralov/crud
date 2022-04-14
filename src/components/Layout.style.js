import styled from "styled-components";

export const ThemeLangWrapper = styled.div`
  display: flex;
  gap: 20px;

  .ant-select-selector {
    width: 100px;
    display: flex;
    align-items: center;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 18px;
  }
`;

export const ContentWrapper = styled.div`
  table {
    width: 78vw;
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
  }

  table thead tr th {
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
  }

  table tbody tr:hover {
    color: #000;
  }
`;
