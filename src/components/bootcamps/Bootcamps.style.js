import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 10px;
`;

export const BtnWrapper = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 1px solid silver;
  padding-bottom: 15px;
`;
export const TableWrapper = styled.div`
  overflow: auto;
  height: 58vh;
  width: 100%;
  .ant-table-thead > tr > th {
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
  }
  table {
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
  }

  table tbody tr:hover {
    color: #000;
  }
`;

export const ModalWrapper = styled.div`
  .ant-modal-content {
    background-color: ${({ theme }) => theme.bgColor} !important;
    color: ${({ theme }) => theme.textColor};
  }
`;
