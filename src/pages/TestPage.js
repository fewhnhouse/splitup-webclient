import React from "react";
import AddExpense from "../footer/expense/AddExpense";

const TestPage = () => (
  <div>
    <AddExpense
      visible={true}
      handleCancel={() => {}}
      handleOk={() => {}}
      type={"type"}
    />
  </div>
);

export default TestPage;
